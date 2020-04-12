import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {ResetPasswordPageComponent} from './reset-password-page/reset-password-page.component';
// import {RegistrationPageComponent} from './signup-page/registration-page.component';


const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  // {path: 'signup', component: RegistrationPageComponent},
  {path: 'reset-password', component: ResetPasswordPageComponent},
  {path: '', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
