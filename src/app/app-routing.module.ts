import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/routes/create/create.component';

// Components
import { IndexComponent } from './components/routes/index/index.component';
import { LoginComponent } from './components/routes/login/login.component';
import { MyeventComponent } from './components/routes/myevent/myevent.component';
import { ProfileComponent } from './components/routes/profile/profile.component';
import { SignupComponent } from './components/routes/signup/signup.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'create', component: CreateComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'myevent/:id', component: MyeventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
