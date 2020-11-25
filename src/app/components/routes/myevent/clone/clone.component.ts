import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsereventControllerService, UsereventEventControllerService } from 'src/app/openapi';
import { TokenserviceService } from 'src/app/services/tokenservice.service';

@Component({
  selector: 'app-clone',
  templateUrl: './clone.component.html',
  styleUrls: ['./clone.component.css']
})
export class CloneComponent implements OnInit {

  @Input() theEvent: Object

  cloneForm: FormGroup
  exceeded: boolean = false
  created: boolean = false
  eventCreated: Object

  constructor(
    private cloneFormBuilder: FormBuilder,
    private tokenService: TokenserviceService,
    private userController: UsereventEventControllerService,
    private userControl: UsereventControllerService
  ) { }

  ngOnInit(): void {
    this.cloneForm = this.cloneFormBuilder.group({
      name: [this.theEvent['name'], Validators.required],
      description: [this.theEvent['description'], Validators.required],
      password: ['', Validators.required],
      date: [''],
      dates: [this.theEvent['dates']]
    })
  }

  convertDate(aDate: string): String {
    const aux = new Date(aDate)
    return aux.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })
  }

  addDate(aDate: Array<Date>) {
    if (aDate[0] instanceof Date && aDate[1] instanceof Date) {
      document.getElementById("datepicker").classList.add("d-none")
      document.getElementById("datearray").classList.add("d-none")
      var toObj = {}
      for (var i = 0; i < aDate.length; i++)
        toObj[i] = (aDate[i]).toString()
      this.cloneForm.value.dates.push(toObj)
    }
    else
      document.getElementById("datepicker").classList.remove("d-none")
  }

  removeDate(index: number) {
    this.cloneForm.value.dates.splice(index, 1)
  }

  compareWithToday(aDate): boolean{
    var aux = new Date(aDate)
    const today = new Date()
    const todayMonth = today.getMonth()
    const todayYear = today.getFullYear()
    return (todayMonth == aux.getMonth() && todayYear == aux.getFullYear())
  }

  randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  theSubmit() {
    if (this.cloneForm.valid) {
      if (this.cloneForm.value.dates.length > 0) {
        const toSend = {
          name: this.cloneForm.value.name,
          description: this.cloneForm.value.description,
          dates: this.cloneForm.value.dates,
          password: this.cloneForm.value.password,
          creationDate: new Date().toString(),
          auth: this.randomString(5)
        }
        if (this.tokenService.isValid()) {
          const user = this.tokenService.getUser()
          this.userController.usereventEventControllerFind(user.id).subscribe((res)=>{
            var contador = 0
            for (var i = 0; i < res.length; i++){
              if (this.compareWithToday(res[i]['creationDate']))
                contador++
            }
            this.userControl.usereventControllerFindById(user.id).subscribe(res=>{
              if (contador < 10 || res['premium']){
                this.userController.usereventEventControllerCreate(user.id,toSend).subscribe((res) => {
                  this.eventCreated = res
                  this.created = true
                })
              }
              else{
                this.exceeded = true
              }
            })
          })
        }
        else{
          console.log('No estas logueado')
        }
      }
      else
      document.getElementById("datearray").classList.remove("d-none")
    }
    else{
      console.log('error')
    }
  }

}
