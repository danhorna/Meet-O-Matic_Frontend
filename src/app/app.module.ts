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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CreatedComponent } from './components/routes/create/created/created.component';
import { ProfileComponent } from './components/routes/profile/profile.component';
import { MyeventComponent } from './components/routes/myevent/myevent.component';
import { CloneComponent } from './components/routes/myevent/clone/clone.component';
import { EventComponent } from './components/routes/event/event.component'
import { VerifiedComponent } from './components/routes/event/verified/verified.component';
import { PremiumComponent } from './components/routes/premium/premium.component';
import { ResultsComponent } from './components/routes/event/results/results.component';
import { LoggedGuard } from './services/guards/logged.guard';
import { NotfoundComponent } from './components/routes/notfound/notfound.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as $ from 'jquery';


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
    PremiumComponent,
    ResultsComponent,
    NotfoundComponent
  ],
  imports: [
    NgxPayPalModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule
  ],
  providers: [
    TokenserviceService,
    LoggedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
