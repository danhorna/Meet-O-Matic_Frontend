import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserControllerService } from 'src/app/openapi';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup
  wrong: boolean = false
  loading: boolean = false
  done: boolean = false

  constructor(
    private signupFormBuilder: FormBuilder,
    private activeRouter: Router,
    private userController: UserControllerService
  ) {
    this.signupForm = this.signupFormBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      name: ['', Validators.compose([Validators.required, Validators.pattern("^[A-Za-z -]+$"), Validators.minLength(3)])]
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
        this.activeRouter.navigateByUrl('/login')
      }
      count--;
    }, 1000);
  }

  signup() {
    if (this.signupForm.valid && !this.done) {
      this.loading = true
      const toSend = {
        email: this.signupForm.value.email,
        name: this.signupForm.value.name,
        password: this.signupForm.value.password
      }
      this.userController.userControllerSignUp(toSend).subscribe((res) => {
        this.loading = false
        this.done = true
        this.delayRedirect()
      },
        (err) => {
          this.loading = false
          this.wrong = true
        })
    }
  }

}
