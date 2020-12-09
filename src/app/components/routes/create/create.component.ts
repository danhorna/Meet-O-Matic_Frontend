import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent, CalendarEventAction, CalendarEventTitleFormatter } from 'angular-calendar';
import { WeekViewHourSegment } from 'calendar-utils';
import { addDays, addMinutes, endOfWeek } from 'date-fns';
import { event } from 'jquery';
import { fromEvent } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { EventControllerService, UsereventControllerService, UsereventEventControllerService } from 'src/app/openapi';
import { TokenserviceService } from 'src/app/services/tokenservice.service';
import { environment } from 'src/environments/environment';

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

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CreateComponent implements OnInit {

  @Input() eventToClone: Object

  createForm: FormGroup

  created: boolean = false  //manejamos transicion a Created
  eventCreated: Object    //almacenamos evento para ser pasado a Created ademas de usarlo para email
  exceeded: boolean = false   //true si ya paso los +10 formularios y muestra div
  recipients: Array<string> = []  //almacena destinarios de email
  emailForm: FormGroup
  loading: boolean = false
  err: boolean = false

  //Calendar
  viewDate = new Date();
  events: CalendarEvent[] = [];
  dragToCreateActive = false;
  weekStartsOn: 0 = 0;
  //

  constructor(
    private createFormBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private tokenService: TokenserviceService,
    private userController: UsereventEventControllerService,
    private eventController: EventControllerService,
    private userControl: UsereventControllerService
  ) {
    this.createForm = this.createFormBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    })
    this.emailForm = this.createFormBuilder.group({
      recipient: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])]
    })
  }

  ngOnInit() {
    if (this.eventToClone) {
      this.createForm.setValue({
        name: this.eventToClone['name'],
        description: this.eventToClone['description'],
        password: ''
      })
      for (var i = 0; i < this.eventToClone['dates'].length; i++){
        this.eventToClone['dates'][i]['start'] = new Date(this.eventToClone['dates'][i]['start'])
        if(this.eventToClone['dates'][i]['end'])
          this.eventToClone['dates'][i]['end'] = new Date(this.eventToClone['dates'][i]['end'])
        this.eventToClone['dates'][i]['actions'] = this.actions
      }
      this.events = this.eventToClone['dates']
    }
  }

  removeEmail(i) {
    this.recipients.splice(i, 1)
  }

  addRecipient() {
    if (this.emailForm.valid && !(this.recipients.includes(this.emailForm.value.recipient))) {
      this.recipients.push(this.emailForm.value.recipient)
      this.emailForm.markAsUntouched()
      this.emailForm.setValue({
        recipient: ''
      })
    }
    else {
      console.log('Email erroneo')
    }
  }

  compareWithToday(aDate): boolean {
    var aux = new Date(aDate)
    const today = new Date()
    const todayMonth = today.getMonth()
    const todayYear = today.getFullYear()
    return (todayMonth == aux.getMonth() && todayYear == aux.getFullYear())
  }

  randomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  theSubmit() {
    if (this.createForm.valid && !this.err) {
      if (this.events.length > 0) {
        this.loading = true
        const toSend = {
          name: this.createForm.value.name,
          description: this.createForm.value.description,
          dates: this.events,
          password: this.createForm.value.password,
          auth: this.randomString(5)
        }
        if (this.tokenService.isValid()) {
          const user = this.tokenService.getUser()
          this.userController.usereventEventControllerFind(user.id).subscribe((res) => {
            var contador = 0
            for (var i = 0; i < res.length; i++) {
              if (this.compareWithToday(res[i]['creationDate']))
                contador++
            }
            this.userControl.usereventControllerFindById(user.id).subscribe(res => {
              if (contador < 10 || res['premium']) {
                this.userController.usereventEventControllerCreate(user.id, toSend).subscribe((res) => {
                  this.eventCreated = res
                  this.created = true
                  if (this.recipients.length > 0 && !res) {
                    const emailToSend = {
                      recipients: this.recipients,
                      eventurl: environment.SITE_URL + environment.EVENT_PATH + this.eventCreated['id'],
                      password: this.eventCreated['password']
                    }
                    this.eventController.eventControllerSendEmail(emailToSend).subscribe()
                  }
                }, (err) => {
                  console.log('Server error')
                })
              }
              else {
                this.err = true
                this.loading = false
              }
            }, (err) => {
              console.log('Server error')
            })
          }, (err) => {
            console.log('Server error')
          })
        }
        else {
          this.eventController.eventControllerCreate(toSend).subscribe((res) => {
            this.eventCreated = res
            this.created = true
            if (this.recipients.length > 0) {
              const emailToSend = {
                recipients: this.recipients,
                eventurl: environment.SITE_URL + environment.EVENT_PATH + this.eventCreated['id'],
                password: this.eventCreated['password']
              }
              this.eventController.eventControllerSendEmail(emailToSend).subscribe()
            }
          }, (err) => {
            console.log('Server error')
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

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
      }
    }
  ];

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
      actions: this.actions
    };
    document.getElementById("datearray").classList.add("d-none")
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
