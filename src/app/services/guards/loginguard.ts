import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { TokenserviceService } from '../tokenservice.service';

@Injectable({
    providedIn: 'root'
  })
export class LoginGuard implements CanActivate {

    constructor(private token:TokenserviceService,private router: Router){

    }
    canActivate() {

        if (this.token.isValid()){
            return true;
        }

        this.router.navigate(['/login']);
        
        return false;
      
    }
  }