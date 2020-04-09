import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../user.service';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {

  form: FormGroup;
  imageUrl: string;
  warnImage = false;
  imageAdded = false;

  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;

  serverMessage: string;

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private authService: UserService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      zipCode: ['', []],
      name: ['', []],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
    });
  }

  changeType(val: 'login' | 'signup' | 'reset') {
    this.type = val;
    if (this.isSignup) {
      this.imageAdded = false;
      this.form.get('zipCode').setValidators([Validators.required]);
      this.form.get('zipCode').updateValueAndValidity();
      this.form.get('name').setValidators([Validators.required]);
      this.form.get('name').updateValueAndValidity();
    } else {
      this.imageAdded = true;
      this.form.get('zipCode').clearValidators();
      this.form.get('zipCode').updateValueAndValidity();
      this.form.get('name').clearValidators();
      this.form.get('name').updateValueAndValidity();
    }
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get name() {
    return this.form.get('name');
  }

  get zipCode() {
    return this.form.get('zipCode');
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  onUpload($event) {
    this.warnImage = false;
    this.imageAdded = true;
    this.imageUrl = $event;
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;
    const name = this.name.value;
    const zipCode = this.zipCode.value;
    if (this.imageAdded || !this.isSignup) {
      try {
        if (this.isLogin) {
          await this.authService.loginUser(email, password);
        }
        if (this.isSignup) {
          await this.authService.createUser(email, password, name, this.imageUrl, zipCode);
        }
        if (this.isPasswordReset) {
          await this.afAuth.sendPasswordResetEmail(email);
          this.serverMessage = 'Check your email';
        }
      } catch (err) {
        this.serverMessage = err;
      }
    } else {
      this.warnImage = true;
    }


    this.loading = false;
  }

}
