import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  eventId = this.route.snapshot.paramMap.get('id')
  toClone: boolean = false
  
  constructor(
    private eventController: EventControllerService,
    private route: ActivatedRoute,
    private tokenService: TokenserviceService,
    private responseController: EventResponseControllerService,
    private activeRouter: Router
  ) { }

  ngOnInit(): void {
    this.eventController.eventControllerFindById(this.eventId).subscribe((res)=>{
      this.eventExists = true
      const user = this.tokenService.getUser()
      if (user.id == res['usereventId']){
        this.theEvent = res
        this.responseController.eventResponseControllerFind(this.eventId).subscribe((res)=>{
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

  disable(){
    this.eventController.eventControllerUpdateById(this.eventId, {"active" : false}).subscribe(res=>{
      this.activeRouter.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
        this.activeRouter.navigateByUrl('/myevent/' + this.eventId, )
      })
    })
  }

  enable(){
    this.eventController.eventControllerUpdateById(this.eventId, {"active" : true}).subscribe(res=>{
      this.activeRouter.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
        this.activeRouter.navigateByUrl('/myevent/' + this.eventId, )
      })
    })
  }

  clone(){
    this.toClone = true
  }
}
