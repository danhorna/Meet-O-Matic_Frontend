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
  wrong: boolean = false
  loading: boolean = false
  logged: boolean = false

  constructor(
    private loginFormBuild: FormBuilder,
    private tokenService: TokenserviceService,
    private activeRouter: Router,
    private userController: UserControllerService
  ) {
    this.loginForm = this.loginFormBuild.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  ngOnInit(): void {
  }

  remo() {
    if (this.wrong) {
      this.wrong = false
    }
  }

  delayRedirect() {
    var count = 3;
    var countdown = setInterval(() => {
      $("#countdown").html("Redirigiendo en " + count);
      if (count == 0) {
        clearInterval(countdown);
        this.activeRouter.navigateByUrl('/')
      }
      count--;
    }, 1000);
  }

  login() {
    if (this.loginForm.valid && !this.logged) {
      this.loading = true
      const toSend = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

      setTimeout(() => {
        this.userController.userControllerLogin(toSend).subscribe((res) => {
          this.loading = false
          this.logged = true
          this.tokenService.saveToken(res.token)
          this.delayRedirect()
        },
          (err) => {
            this.loading = false
            this.wrong = true
          })
      }, 2000);
    }
  }
}
