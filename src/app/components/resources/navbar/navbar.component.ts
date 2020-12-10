import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { TokenserviceService } from 'src/app/services/tokenservice.service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: UserModel

  constructor(
    private tokenService: TokenserviceService,
    private activeRouter: Router) {
    activeRouter.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        setTimeout(() => { this.test(); }, 200);
      }
    })
  }

  ngOnInit(): void {
    $(window).on('resize', function () {
      setTimeout(function () { this.test(); }, 500);
    });
  }

  print(): boolean{
    var arrpath = (location.pathname).split('/')
    if(environment.NAV_HIDE.includes(arrpath[1]))
      return false
    return true
  }

  isLogged(): boolean {
    if (this.tokenService.isValid())
      this.user = this.tokenService.getUser()
    return this.tokenService.isValid()
  }

  logout() {
    this.tokenService.signOut()
    this.activeRouter.navigateByUrl('/')
  }

  isActive(path) {
    return path == location.pathname
  }

  load() {
    setTimeout(function () { this.test(); });
  }

  test() {
    if (this.print()) {
      var tabsNewAnim = $('#navbarSupportedContent');
      var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
      var activeItemNewAnim = tabsNewAnim.find('.active');
      var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
      var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
      var itemPosNewAnimTop = activeItemNewAnim.position();
      var itemPosNewAnimLeft = activeItemNewAnim.position();
      $(".hori-selector").css({
        "top": itemPosNewAnimTop.top + "px",
        "left": itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
      $("#navbarSupportedContent").on("click", "li", function (e) {
        $('#navbarSupportedContent ul li').removeClass("active");
        $(this).addClass('active');
        var activeWidthNewAnimHeight = $(this).innerHeight();
        var activeWidthNewAnimWidth = $(this).innerWidth();
        var itemPosNewAnimTop = $(this).position();
        var itemPosNewAnimLeft = $(this).position();
        $(".hori-selector").css({
          "top": itemPosNewAnimTop.top + "px",
          "left": itemPosNewAnimLeft.left + "px",
          "height": activeWidthNewAnimHeight + "px",
          "width": activeWidthNewAnimWidth + "px"
        });
      });
    }
  }


}

// ---------Responsive-navbar-active-animation-----------



