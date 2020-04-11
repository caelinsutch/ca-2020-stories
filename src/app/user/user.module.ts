import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {SharedModule} from '../shared/shared.module';
import {EmailLoginComponent} from './email-login/email-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RegistrationPageComponent } from './signup-page/registration-page.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [LoginPageComponent, EmailLoginComponent, RegistrationPageComponent, UpdatePageComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatStepperModule,
  ]
})
export class UserModule { }
