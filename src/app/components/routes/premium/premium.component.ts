import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { UsereventControllerService } from 'src/app/openapi/api/usereventController.service';
import { TokenServiceInterface } from 'src/app/services/tokenservice.interface';
import { TokenserviceService } from 'src/app/services/tokenservice.service';
@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {


  public payPalConfig: IPayPalConfig;
  premiumUser: boolean
  user: Object

  constructor(
    private UserController: UsereventControllerService,
    private tokenController: TokenserviceService
  ) {
  }

  ngOnInit(): void {
    this.user = this.tokenController.getUser()
    this.UserController.usereventControllerFindById(this.user['id']).subscribe((res)=>{
      this.premiumUser = res['premium']
      if (!this.premiumUser)
        this.initConfig() 
    })
  }

  initConfig() {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'ASLt7P3GHfrZqLGXT8MEIByIKD49JGQfwoy1poGbA9J0FwZeSlH6Ubb4ZeaSeg_8W2g3p7vm0JPLxdK4',

      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '0.01',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: '0.01'
                }
              }
            },
            items: [
              {
                name: 'Meet-O-Matic Premium',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: '0.01',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        // Transaccion aprobada pero no autorizada
        actions.order.get().then(details => {
          // En details se encuentra la descripcion de la transaccion
        });
      },
      onClientAuthorization: (data) => {
        // Transaccion autorizada, detalles de la compra en *data*
        this.UserController.usereventControllerUpdateById(this.user['id'],{premium: true}).subscribe(res=>{
          this.premiumUser = true
        })
      },
      onCancel: (data, actions) => {
        // Al cancelar transaccion, *data* almacena el ID de la orden
      },
      onError: err => {
        // Error interno de PayPal
      }
    };
  }

}
