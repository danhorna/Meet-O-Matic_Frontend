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

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    TokenserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
