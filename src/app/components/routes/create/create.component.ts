import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventControllerService, UsereventEventControllerService } from 'src/app/openapi';
import { TokenserviceService } from 'src/app/services/tokenservice.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup
  created: boolean = false
  eventCreated
  constructor(
    private createFormBuilder: FormBuilder,
    private tokenService: TokenserviceService,
    private userController: UsereventEventControllerService,
    private eventController: EventControllerService
  ) {
    this.createForm = this.createFormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      password: ['', Validators.required],
      date: [''],
      dates: new FormArray([])
    })
  }

  ngOnInit(): void {
  }

  convertDate(aDate: Date): String {
    return aDate.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })
  }

  addDate(aDate: Array<Date>) {
    if (aDate[0] instanceof Date && aDate[1] instanceof Date) {
      document.getElementById("datepicker").classList.add("d-none")
      document.getElementById("datearray").classList.add("d-none")
      this.createForm.value.dates.push(aDate)
    }
    else
      document.getElementById("datepicker").classList.remove("d-none")
  }

  removeDate(index: number) {
    this.createForm.value.dates.splice(index, 1)
  }

  theSubmit() {
    if (this.createForm.valid) {
      if (this.createForm.value.dates.length > 0) {
        const toSend = {
          name: this.createForm.value.name,
          description: this.createForm.value.description,
          dates: this.createForm.value.dates,
          password: this.createForm.value.password
        }
        if (this.tokenService.isValid()) {
          const user = this.tokenService.getUser()
          // Agregar manejo de cant de form
          this.userController.usereventEventControllerCreate(user.id,toSend).subscribe((res) => {
              this.eventCreated = res
            })
        }
        else {
          this.eventController.eventControllerCreate(toSend).subscribe((res) => {
            this.eventCreated = res
          })
        }
        this.created = true
      }
      else
        document.getElementById("datearray").classList.remove("d-none")
    }
    else {
      console.log('error')
    }
  }

}
