import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { UsereventEventControllerService } from 'src/app/openapi';
import { TokenserviceService } from '../tokenservice.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(
    private token: TokenserviceService,
    private router: Router,
    private controllerUser: UsereventEventControllerService
  ) { }
  
  canActivate() {
    if (this.token.isValid()) {
      this.controllerUser.configuration.accessToken = this.token.getToken();
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}