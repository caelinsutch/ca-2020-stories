import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegistrationPageComponent} from './signup-page/registration-page.component';


const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'signup', component: RegistrationPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
