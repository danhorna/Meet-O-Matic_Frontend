import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventControllerService } from 'src/app/openapi';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  passForm: FormGroup
  id: string
  exists: Boolean
  actualEvent: Object
  waitingpass: Boolean
  approved: Boolean= false
  eventApp: Object

  constructor(
    private _builder: FormBuilder,
    private route: ActivatedRoute,
    private eventController: EventControllerService
  ) {
    this.passForm = this._builder.group({
      password: ['', Validators.required]
    })
    this.waitingpass = true
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.eventController.eventControllerFindById(this.id).subscribe((res) =>{
      this.actualEvent = res
      this.exists = true
    }, (err) =>{
      // El evento no existe
      this.exists = false
    })
  }

  theSubmit(): void{
    if (this.actualEvent['password'] == this.passForm.value.password){
      this.approved = true
      this.waitingpass = false
      this.eventApp = this.actualEvent
    }
    else{
      console.log('no es la pass')
    }
  }
}
