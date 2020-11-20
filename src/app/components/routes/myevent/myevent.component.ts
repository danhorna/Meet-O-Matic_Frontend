import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventControllerService, EventResponseControllerService} from 'src/app/openapi';
import { TokenserviceService } from 'src/app/services/tokenservice.service';

@Component({
  selector: 'app-myevent',
  templateUrl: './myevent.component.html',
  styleUrls: ['./myevent.component.css']
})
export class MyeventComponent implements OnInit {

  eventExists: boolean
  accessible: boolean
  cantResponses: number
  theEvent : Object

  constructor(
    private eventController: EventControllerService,
    private route: ActivatedRoute,
    private tokenService: TokenserviceService,
    private responseController: EventResponseControllerService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.eventController.eventControllerFindById(id).subscribe((res)=>{
      this.eventExists = true
      const user = this.tokenService.getUser()
      if (user.id == res['usereventId']){
        this.theEvent = res
        this.responseController.eventResponseControllerFind(id).subscribe((res)=>{
          this.cantResponses = res.length
        })
        this.accessible = true
      }
      else{
        this.accessible = false
      }
    },
    (err)=>{
      this.eventExists = false
    }
    )
  }

  

}
