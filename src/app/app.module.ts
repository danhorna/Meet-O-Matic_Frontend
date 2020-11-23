import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPayPalModule } from 'ngx-paypal';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './components/routes/index/index.component';
import { NavbarComponent } from './components/resources/navbar/navbar.component';
import { LoginComponent } from './components/routes/login/login.component';
import { TokenserviceService } from './services/tokenservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './components/routes/signup/signup.component';
import { CreateComponent } from './components/routes/create/create.component';

// Date picker
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CreatedComponent } from './components/routes/create/created/created.component';
import { ProfileComponent } from './components/routes/profile/profile.component';
import { MyeventComponent } from './components/routes/myevent/myevent.component';
import { CloneComponent } from './components/routes/myevent/clone/clone.component';
import { EventComponent } from './components/routes/event/event.component'
import { VerifiedComponent } from './components/routes/event/verified/verified.component';
import { PremiumComponent } from './components/routes/premium/premium.component'

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    CreateComponent,
    CreatedComponent,
    ProfileComponent,
    MyeventComponent,
    CloneComponent,
    EventComponent,
    VerifiedComponent,
    PremiumComponent
  ],
  imports: [
    NgxPayPalModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    TokenserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
