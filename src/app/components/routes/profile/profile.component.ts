import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EventControllerService, EventResponseControllerService, UsereventEventControllerService } from 'src/app/openapi';
import { UsereventControllerService } from 'src/app/openapi/api/usereventController.service';
import { TokenserviceService } from 'src/app/services/tokenservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {

  myEvents: Array<Object> = []
  eventsResponses: Array<number> = []
  premiumUser: boolean 
  toClone: boolean = false
  eventToClone: object

  constructor(
    private userController: UsereventEventControllerService,
    private tokenController: TokenserviceService,
    private UserController: UsereventControllerService,
    private responseController: EventResponseControllerService,
    private eventController : EventControllerService,
    private activeRouter: Router
  ) { }

  ngOnInit(): void {
    const user = this.tokenController.getUser()
    this.userController.usereventEventControllerFind(user.id).subscribe((res)=>{
      this.myEvents = res
      this.loadResponses()
    }, (err) => {
      console.log(err)
    })
    this.UserController.usereventControllerFindById(user.id).subscribe((res)=>{
      this.premiumUser = res['premium']
    })
  }

  disableEvent(aEvent){
    this.eventController.eventControllerUpdateById(aEvent, {"active" : false}).subscribe(res=>{
      this.activeRouter.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
        this.activeRouter.navigateByUrl('/profile')
      })
    })
  }

  enableEvent(aEvent){
    this.eventController.eventControllerUpdateById(aEvent, {"active" : true}).subscribe(res=>{
      this.activeRouter.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
        this.activeRouter.navigateByUrl('/profile')
      })
    })
  }

  eventResults(item){
    this.activeRouter.navigateByUrl('/event/' + item['id'] + '?auth=' + item['auth'])
  }

  loadResponses() {
    for (let i = 0; i < this.myEvents.length; i++) {
      this.responseController.eventResponseControllerFind(this.myEvents[i]['id']).subscribe((res)=> {
        this.eventsResponses[i] = res.length
      })
    }
  }

  cloneEvent(aEvent) {
    this.eventToClone = aEvent
    this.toClone = true
  }

}

$(document).ready(function() {
  $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
      e.preventDefault();
      $(this).siblings('a.active').removeClass("active");
      $(this).addClass("active");
      var index = $(this).index();
      $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
      $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
  });
});