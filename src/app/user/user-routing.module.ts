import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {ResetPasswordPageComponent} from './reset-password-page/reset-password-page.component';
import {RegistrationPageComponent} from './signup-page/registration-page.component';
import {UpdatePageComponent} from './update-page/update-page.component';
import {IsAuthGuard} from '../shared/auth/is-auth.guard';


const routes: Routes = [
  {path: 'login', component: LoginPageComponent, canActivate: [IsAuthGuard]},
  {path: 'signup', component: RegistrationPageComponent, canActivate: [IsAuthGuard]},
  {path: 'reset-password', component: ResetPasswordPageComponent, canActivate: [IsAuthGuard]},
  {path: 'update', component: UpdatePageComponent},
  {path: '', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
