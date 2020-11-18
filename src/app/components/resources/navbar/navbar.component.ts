import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { TokenserviceService } from 'src/app/services/tokenservice.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: UserModel

  constructor(private tokenService:TokenserviceService, private actuveROuter: Router) { }

  ngOnInit(): void {
  }

  isLogged(): boolean {
    if (this.tokenService.isValid())
      this.user = this.tokenService.getUser()
    return this.tokenService.isValid()
  }

  logout() {
    this.tokenService.signOut()
    this.actuveROuter.navigateByUrl('/')
  }

}
