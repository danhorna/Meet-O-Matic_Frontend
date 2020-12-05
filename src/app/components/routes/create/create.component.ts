import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { WeekViewHourSegment } from 'calendar-utils';
import { addDays, addMinutes, endOfWeek } from 'date-fns';
import { fromEvent } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { EventControllerService, UsereventControllerService, UsereventEventControllerService } from 'src/app/openapi';
import { TokenserviceService } from 'src/app/services/tokenservice.service';
import { environment } from 'src/environments/environment';

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  weekTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.weekTooltip(event, title);
    }
  }

  dayTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.dayTooltip(event, title);
    }
  }
}

@Component({
  selector: 'app-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
  styles: [
    `
      .disable-hover {
        pointer-events: none;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CreateComponent{

  createForm: FormGroup
  created: boolean = false
  eventCreated: Object
  exceeded: boolean = false
  recipients: Array<string> = []
  emailForm: FormGroup

  viewDate = new Date();

  events: CalendarEvent[] = [];

  dragToCreateActive = false;

  weekStartsOn: 0 = 0;

  constructor(
    private createFormBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenserviceService,
    private userController: UsereventEventControllerService,
    private eventController: EventControllerService,
    private userControl: UsereventControllerService
  ) {
    this.createForm = this.createFormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.emailForm = this.createFormBuilder.group({
      recipient: ['',Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])]
    })
  }

  removeEmail(i){
    this.recipients.splice(i, 1)
  }

  addRecipient(){
    if (this.emailForm.valid) {
      this.recipients.push(this.emailForm.value.recipient)
    }
    else{
      console.log('Email erroneo')
    }
  }

  convertDate(aDate: string): String {
    const aux = new Date(aDate)
    return aux.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })
  }

  addDate(aDate: Array<Date>) {
    if (aDate[0] instanceof Date && aDate[1] instanceof Date) {
      document.getElementById("datepicker").classList.add("d-none")
      document.getElementById("datearray").classList.add("d-none")
      var toObj = {}
      for (var i = 0; i < aDate.length; i++)
        toObj[i] = (aDate[i]).toString()
      this.createForm.value.dates.push(toObj)
    }
    else
      document.getElementById("datepicker").classList.remove("d-none")
  }

  removeDate(index: number) {
    this.createForm.value.dates.splice(index, 1)
  }

  compareWithToday(aDate): boolean{
    var aux = new Date(aDate)
    const today = new Date()
    const todayMonth = today.getMonth()
    const todayYear = today.getFullYear()
    return (todayMonth == aux.getMonth() && todayYear == aux.getFullYear())
  }

  randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  theSubmit() {
    if (this.createForm.valid) {
      if (this.events.length > 0) {
        const toSend = {
          name: this.createForm.value.name,
          description: this.createForm.value.description,
          dates: this.events,
          password: this.createForm.value.password,
          creationDate: new Date().toString(),
          auth: this.randomString(5)
        }
        if (this.tokenService.isValid()) {
          const user = this.tokenService.getUser()
          this.userController.usereventEventControllerFind(user.id).subscribe((res)=>{
            var contador = 0
            for (var i = 0; i < res.length; i++){
              if (this.compareWithToday(res[i]['creationDate']))
                contador++
            }
            this.userControl.usereventControllerFindById(user.id).subscribe(res=>{
              if (contador < 10 || res['premium']){
                this.userController.usereventEventControllerCreate(user.id,toSend).subscribe((res) => {
                  this.eventCreated = res
                  this.created = true
                  if (this.recipients.length > 0){
                    const emailToSend = {
                      recipients: this.recipients,
                      eventurl: environment.SITE_URL + environment.EVENT_PATH + this.eventCreated['id'],
                      password: this.eventCreated['password']
                    }
                    this.eventController.eventControllerSendEmail(emailToSend).subscribe()
                  }
                })
              }
              else{
                this.exceeded = true
              }
            })
          })
        }
        else {
          this.eventController.eventControllerCreate(toSend).subscribe((res) => {
            this.eventCreated = res
            this.created = true
            if (this.recipients.length > 0){
              const emailToSend = {
                recipients: this.recipients,
                eventurl: environment.SITE_URL + environment.EVENT_PATH + this.eventCreated['id'],
                password: this.eventCreated['password']
              }
              this.eventController.eventControllerSendEmail(emailToSend).subscribe()
            }
          })
        }
      }
      else
        document.getElementById("datearray").classList.remove("d-none")
    }
    else {
      console.log('error')
    }
  }

  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: '',
      start: segment.date,
      meta: {
        tmpEvent: true,
      },
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refresh();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refresh();
      });
  }

  private refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }

}
