import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit, AfterViewInit, OnDestroy {

  form: FormGroup;
  imageUrl: string;
  warnImage = false;
  imageAdded = false;

  type: 'login' | 'signup' | 'reset' | 'update' = 'signup';
  loading = false;
  afAuthSub: Subscription;
  currentUser: User;

  serverMessage: string;

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private authService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      zipCode: ['', []],
      school: ['', []],
      name: ['', []],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
    });
  }

  ngAfterViewInit(): void {
    this.afAuthSub = this.authService.getCurrentUser().subscribe(v => {
      if (v) {
        this.changeType('update');
        this.currentUser = v;
        this.zipCode.setValue(this.currentUser.zipCode);
        this.school.setValue(this.currentUser.school);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isUpdate) {
      this.afAuthSub.unsubscribe();
    }
  }

  changeType(val: 'login' | 'signup' | 'reset' | 'update') {
    this.type = val;
    // Change validators on non essential form fields
    if (this.isSignup) {
      this.imageAdded = false;
      this.zipCode.setValidators([Validators.required]);
      this.zipCode.updateValueAndValidity();
      this.school.setValidators([Validators.required]);
      this.school.updateValueAndValidity();
      this.name.setValidators([Validators.required]);
      this.name.updateValueAndValidity();
    } else if (this.isUpdate) {
      this.imageAdded = true;
      this.zipCode.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(5)]);
      this.zipCode.updateValueAndValidity();
      this.school.setValidators([Validators.required]);
      this.school.updateValueAndValidity();
      this.updateAndClearValidator(this.name);
      this.updateAndClearValidator(this.email);
      this.updateAndClearValidator(this.password);
      this.updateAndClearValidator(this.passwordConfirm);
    } else {
      this.imageAdded = true;
      this.updateAndClearValidator(this.zipCode);
      this.updateAndClearValidator(this.school);
      this.updateAndClearValidator(this.name);
    }
  }

  private updateAndClearValidator(field) {
    field.clearValidators();
    field.updateValueAndValidity();
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

  get isUpdate() {
    return this.type === 'update';
  }

  get name() {
    return this.form.get('name');
  }

  get zipCode() {
    return this.form.get('zipCode');
  }

  get school() {
    return this.form.get('school');
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
    const school = this.school.value;
    if (this.imageAdded || !this.isSignup) {
      try {
        if (this.isLogin) {
          await this.authService.loginUser(email, password);
        }
        if (this.isSignup) {
          await this.authService.createUser(email, password, name, this.imageUrl, zipCode, school);
        }
        if (this.isUpdate) {
          const newUser: User = {school, zipCode};
          await this.authService.updateUser(newUser);
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
