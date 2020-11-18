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

  constructor(
    private signupFormBuilder: FormBuilder,
    private activeRouter: Router,
    private userController: UserControllerService
  ) {
    this.signupForm = this.signupFormBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  signup(){
    const toSend = {
      email: this.signupForm.value.email,
      name: this.signupForm.value.name,
      password: this.signupForm.value.password
    }
    this.userController.userControllerSignUp(toSend).subscribe((res)=>{
      // agregar alerta de registrado
      this.activeRouter.navigateByUrl('/login')
    })
  }

}
