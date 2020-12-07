import { Component, OnInit } from '@angular/core';
import { UsereventEventControllerService } from 'src/app/openapi';
import { UsereventControllerService } from 'src/app/openapi/api/usereventController.service';
import { TokenserviceService } from 'src/app/services/tokenservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myEvents: Array<Object> = []
  premiumUser: boolean 

  constructor(
    private userController: UsereventEventControllerService,
    private tokenController: TokenserviceService,
    private UserController: UsereventControllerService
  ) { }

  ngOnInit(): void {
    const user = this.tokenController.getUser()
    this.userController.usereventEventControllerFind(user.id).subscribe((res)=>{
      this.myEvents = res
    })
    this.UserController.usereventControllerFindById(user.id).subscribe((res)=>{
      this.premiumUser = res['premium']
    })
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
