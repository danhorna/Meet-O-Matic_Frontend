import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserControllerService } from 'src/app/openapi';
import { TokenserviceService } from 'src/app/services/tokenservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private loginFormBuild: FormBuilder,
    private tokenService: TokenserviceService,
    private activeRouter: Router,
    private userController: UserControllerService
  ) {
    this.loginForm = this.loginFormBuild.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login(){
    if (this.loginForm.valid){
      const toSend = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

      this.userController.userControllerLogin(toSend).subscribe((res)=>{
        this.tokenService.saveToken(res.token)
        this.activeRouter.navigateByUrl('/')
      })
    }
  }

}
