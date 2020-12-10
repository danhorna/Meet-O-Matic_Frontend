// Copyright ragonzalz@distroot.org. 2020. All Rights Reserved.
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenServiceInterface } from './tokenservice.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenserviceService implements TokenServiceInterface{

  helper: JwtHelperService = null;

  constructor() { 
    this.helper = new JwtHelperService();
  }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(environment.TOKEN_KEY);
    localStorage.setItem(environment.TOKEN_KEY, token);
  }

  public isValid(): boolean{
    if (this.getToken()){
      return !(this.helper.isTokenExpired(this.getToken()))
    }
    return false;
  } 

  public isLogin(): boolean {
    return (this.isValid());

  }

  public getToken(): string {
    return localStorage.getItem(environment.TOKEN_KEY);
  }

  public saveUser(user): void {
    localStorage.removeItem(environment.USER_KEY);
    localStorage.setItem(environment.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return this.helper.decodeToken(this.getToken());
  }
}