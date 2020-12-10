import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { EventControllerService, EventResponseControllerService } from 'src/app/openapi';
import { colors } from './colors'
@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.css']
})
export class VerifiedComponent implements OnInit {


  eventId = this.route.snapshot.paramMap.get('id')
  responseForm: FormGroup
  theEvent: Object
  datesSelected: Array<Object> = []
  access: boolean = false
  saved: boolean = false

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  events = []
  loading: boolean = false
  err: boolean = false

  constructor(
    private route: ActivatedRoute,
    private responseFormBuilder: FormBuilder,
    private eventController: EventControllerService,
    private eventresponseController: EventResponseControllerService
  ) {
    this.responseForm = this.responseFormBuilder.group({
      prefdates: [null],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      message: ['']
    })
  }

  ngOnInit(): void {
    this.eventController.eventControllerFindById(this.eventId).subscribe(res => {
      this.events = res['dates']
      for (var i = 0; i < this.events.length; i++) {
        this.events[i].start = new Date(this.events[i].start)
        this.events[i].end = new Date(this.events[i].end)
        this.events[i].actions = []
      }
      this.theEvent = res
      this.access = true
    })
  }

  eventClicked(aEvent) {
    if (!(this.datesSelected.includes(aEvent['event']))) {
      var eventI = this.events.findIndex((ev => ev['id'] == aEvent['event']['id']))
      this.datesSelected.push(aEvent['event'])
      this.events[eventI].title = 'Seleccionado'
      this.events[eventI].color = colors.green
    }
    else{
      var eventI = this.events.findIndex((ev => ev['id'] == aEvent['event']['id']))
      var selecI = this.datesSelected.findIndex((ev => ev['id'] == aEvent['event']['id']))
      this.datesSelected.splice(selecI, 1)
      this.events[eventI].title = ''
      this.events[eventI].color = colors.blue
    }
  }

  theSubmit() {
    if (this.responseForm.valid && !this.err) {
      if (this.datesSelected.length > 0) {
        this.loading = true
        const toSend = {
          prefdates: this.datesSelected,
          name: this.responseForm.value.name,
          message: this.responseForm.value.message
        }
        this.eventresponseController.eventResponseControllerCreate(this.theEvent['id'], toSend).subscribe((res) => {
          this.saved = true
        },()=>{
          this.loading= false
          this.err = true
        })
      }
      else {
        document.getElementById("datearray").classList.remove("d-none")
      }

    }
    else {
      console.log('form no valido')
    }
  }
}
