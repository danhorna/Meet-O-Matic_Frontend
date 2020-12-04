import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenserviceService } from '../tokenservice.service';

@Injectable({
  providedIn: 'root'
})
export class NotloggedGuard implements CanActivate {

  constructor(
    private token: TokenserviceService,
    private router: Router
  ) { }

  canActivate() {
    if (this.token.isValid()) {
      this.router.navigate(['/']);
      return false;
    }
    return true
  }

}
