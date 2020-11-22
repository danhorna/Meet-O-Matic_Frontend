import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventControllerService } from 'src/app/openapi';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {


  eventId = this.route.snapshot.paramMap.get('id')
  responseForm: FormGroup
  theEvent: Object
  access: boolean = false

  constructor(
    private route: ActivatedRoute,
    private responseFormBuilder: FormBuilder,
    private eventController: EventControllerService
  ) {
    this.responseForm = this.responseFormBuilder.group({
      prefdates: new FormArray([]),
      name: ['', Validators.required],
      message: ['']
    })
  }

  ngOnInit(): void {
    this.eventController.eventControllerFindById(this.eventId).subscribe(res=>{
      this.theEvent = res
      this.access = true
    })
  }

}
