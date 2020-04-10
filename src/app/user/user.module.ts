import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {SharedModule} from '../shared/shared.module';
import {EmailLoginComponent} from './email-login/email-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [LoginPageComponent, EmailLoginComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ]
})
export class UserModule { }
