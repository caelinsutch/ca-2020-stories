import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {

  serverMessage;
  loading = false;
  form: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  async onSubmit() {
    this.loading = true;
    try {
      await this.userService.resetPassword(this.email.value);
      this.loading = false;
      this.serverMessage = 'Check your email!';
    } catch (e) {
      this.loading = false;
      this.serverMessage = e;
    }
  }

}
