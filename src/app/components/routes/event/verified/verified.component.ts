import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventControllerService, EventResponseControllerService } from 'src/app/openapi';

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
  origin: Object
  saved: boolean = false

  constructor(
    private route: ActivatedRoute,
    private responseFormBuilder: FormBuilder,
    private eventController: EventControllerService,
    private eventresponseController: EventResponseControllerService
  ) {
    this.responseForm = this.responseFormBuilder.group({
      prefdates: [null],
      name: ['', Validators.required],
      message: [''],
      origin: [null]
    })
  }

  ngOnInit(): void {
    this.eventController.eventControllerFindById(this.eventId).subscribe(res=>{
      this.theEvent = res
      this.access = true
    })
  }

  convertDate(aDate: string): String {
    const aux = new Date(aDate)
    return aux.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })
  }

  addDate(){
    document.getElementById("datearray").classList.add("d-none")
    const dateToAdd = this.responseForm.value.origin[0]
    this.datesSelected.push(dateToAdd)
    for (var i = 0; i < this.theEvent['dates'].length; i++)
      if(this.theEvent['dates'][i] === dateToAdd )
        this.theEvent['dates'].splice(i,1)
  }

  delDate(){
    const dateToDel = this.responseForm.value.prefdates[0]
    this.theEvent['dates'].push(dateToDel)
    for (var i = 0; i < this.datesSelected.length; i++)
      if(this.datesSelected[i] === dateToDel )
        this.datesSelected.splice(i,1)
  }
  
  theSubmit(){
    if (this.responseForm.valid){
      if (this.datesSelected.length > 0) {
        const toSend = {
          prefdates: this.datesSelected,
          name: this.responseForm.value.name,
          message: this.responseForm.value.message
        }
        this.eventresponseController.eventResponseControllerCreate(this.theEvent['id'],toSend).subscribe((res)=>{
          this.saved = true
        })
      }
      else{
        document.getElementById("datearray").classList.remove("d-none")
      }

    }
    else{
      console.log('form no valido')
    }
  }
}
