import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventControllerService } from 'src/app/openapi';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  passForm: FormGroup   // Definiendo el formulario de la contraseña
  id: string    // Almaceno id del evento desde url
  exists: Boolean = false   // Para saber si existe el evento y habilitar div en el html
  actualEvent: Object   //  Almacenamos el evento
  waitingpass: Boolean = true    // Esperamos el ingreso de la contraseña
  approved: Boolean= false    //  Si la contraseña ingresada es correcta modificamos el dom
  auth: string    //  Almaceno parametro auth
  resultAccess: boolean = false   // Para dar acceso a los resultados

  constructor(
    private _builder: FormBuilder,
    private route: ActivatedRoute,
    private eventController: EventControllerService
  ) {
    this.passForm = this._builder.group({
      password: ['', Validators.required]
    })
    this.auth = this.route.snapshot.queryParamMap.get('auth')
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.eventController.eventControllerFindById(this.id).subscribe((res) =>{
      this.actualEvent = res
      if (this.actualEvent['auth'] == this.auth)
        this.resultAccess = true
      this.exists = true
    }, (err) =>{
      // El evento no existe
      this.exists = false
    })
  }

  theSubmit(): void{
    if (this.actualEvent['password'] == this.passForm.value.password){
      this.approved = true
      this.waitingpass = false
    }
    else{
      console.log('no es la pass')
    }
  }
}
