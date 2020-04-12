import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RegistrationPageComponent } from './signup-page/registration-page.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import {MatStepperModule} from '@angular/material/stepper';
import {ResetPasswordPageComponent} from './reset-password-page/reset-password-page.component';


@NgModule({
  declarations: [LoginPageComponent, ResetPasswordPageComponent, RegistrationPageComponent, UpdatePageComponent],
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
