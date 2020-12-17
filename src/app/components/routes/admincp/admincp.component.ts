import { Component, OnInit } from '@angular/core';
import { EventControllerService, UsereventControllerService } from 'src/app/openapi';

@Component({
  selector: 'app-admincp',
  templateUrl: './admincp.component.html',
  styleUrls: ['./admincp.component.css']
})
export class AdmincpComponent implements OnInit {

  allUsers: Array<Object> = []
  allEvents: Array<Object> = []
  constructor(
    private usereventController: UsereventControllerService,
    private eventController: EventControllerService
  ) { }

  ngOnInit(): void {
    this.usereventController.usereventControllerFind().subscribe((res)=>{
      this.allUsers = res
    })
    this.eventController.eventControllerFind().subscribe((res)=>{
      this.allEvents = res
    })
  }

}
