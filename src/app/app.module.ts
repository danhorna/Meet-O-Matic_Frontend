import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    CreateComponent,
    CreatedComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule
  ],
  providers: [
    TokenserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
