import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/routes/create/create.component';
import { EventComponent } from './components/routes/event/event.component';

// Components
import { IndexComponent } from './components/routes/index/index.component';
import { LoginComponent } from './components/routes/login/login.component';
import { MyeventComponent } from './components/routes/myevent/myevent.component';
import { NotfoundComponent } from './components/routes/notfound/notfound.component';
import { PremiumComponent } from './components/routes/premium/premium.component';
import { ProfileComponent } from './components/routes/profile/profile.component';
import { SignupComponent } from './components/routes/signup/signup.component';
import { LoggedGuard } from './services/guards/logged.guard';
import { NotloggedGuard } from './services/guards/notlogged.guard';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotloggedGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [NotloggedGuard]},
  { path: 'create', component: CreateComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedGuard]},
  { path: 'myevent/:id', component: MyeventComponent, canActivate: [LoggedGuard]},
  { path: 'event/:id', component: EventComponent},
  { path: 'premium', component: PremiumComponent, canActivate: [LoggedGuard]},
  { path: '404', component: NotfoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
