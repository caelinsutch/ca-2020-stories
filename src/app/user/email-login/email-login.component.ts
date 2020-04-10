import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {Subscription} from 'rxjs';
import {ImageUploadService} from '../../shared/image-upload.service';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})

// TODO this is getting too fat and unmainatable, splitup into seperate login, signup, and update forms
// TODO Signup as a stepper, inidivudla file upload indicators (progress) for each step where image upload required
// TODO Update have a file upload progress indicator
export class EmailLoginComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private authService: UserService,
    private imageUploadService: ImageUploadService,
  ) {
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

  get emailOptIn() {
    return this.form.get('emailOptIn');
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

  form: FormGroup;
  verificationImage: File;
  verificationImageUrl: string;
  profileImage: File;
  profileImageUrl: string;
  warnProfileImage = false;
  profileImageAdded = false;
  verificationWarnImage = false;
  verificationImageAdded = false;
  widgetLoading = true;

  type: 'login' | 'signup' | 'reset' | 'update' = 'login';
  loading = false;
  afAuthSub: Subscription;
  currentUser: User;

  serverMessage: string;

  private static updateAndClearValidators(fields: any[]) {
    fields.forEach(field => {
      field.clearValidators();
      field.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      zipCode: ['', [Validators.minLength(5), Validators.maxLength(5)]],
      school: ['', []],
      name: ['', []],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []],
      emailOptIn: [true, []]
    });
  }

  ngAfterViewInit(): void {
    this.afAuthSub = this.authService.getCurrentUser().subscribe(v => {
      this.widgetLoading = false;
      if (v) {
        this.changeType('update');
        this.currentUser = v;
        this.zipCode.setValue(this.currentUser.zipCode);
        this.school.setValue(this.currentUser.school);
      }
    });
  }

  ngOnDestroy(): void {
    this.afAuthSub.unsubscribe();
  }

  changeType(val: 'login' | 'signup' | 'reset' | 'update') {
    this.type = val;
    // Change validators on non essential form fields
    if (this.isSignup) {
      this.profileImageAdded = false;
      this.verificationImageAdded = false;
      this.zipCode.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(5)]);
      this.zipCode.updateValueAndValidity();
      this.school.setValidators([Validators.required]);
      this.school.updateValueAndValidity();
      this.name.setValidators([Validators.required]);
      this.name.updateValueAndValidity();
    } else if (this.isUpdate) {
      this.profileImageAdded = true;
      this.verificationImageAdded = true;
      this.zipCode.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(5)]);
      this.zipCode.updateValueAndValidity();
      this.school.setValidators([Validators.required]);
      this.school.updateValueAndValidity();
      EmailLoginComponent.updateAndClearValidators([this.name, this.email, this.password, this.passwordConfirm]);
    } else {
      this.profileImageAdded = true;
      this.verificationImageAdded = true;
      EmailLoginComponent.updateAndClearValidators([this.zipCode, this.school, this.name, this.passwordConfirm]);
    }
  }

  onVerificationFile($event: File) {
    this.verificationWarnImage = false;
    this.verificationImageAdded = true;
    this.verificationImage = $event;
  }

  onProfileFile($event: File) {
    this.warnProfileImage = false;
    this.profileImageAdded = true;
    this.profileImage = $event;
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;
    const name = this.name.value;
    const zipCode = this.zipCode.value;
    const school = this.school.value;
    const emailOptIn = this.emailOptIn.value;
    if (this.verificationImageAdded || this.profileImageAdded || !this.isSignup) {
      try {
        if (this.isLogin) {
          await this.authService.loginUser(email, password);
        }
        if (this.isSignup) {
          await this.imageUploadService.uploadFile('profile-pictures', email, this.profileImage).then(v => {
            this.profileImageUrl = v;
          });
          this.imageUploadService.uploadFile('verification', email, this.verificationImage).then(url => {
            this.verificationImageUrl = url;
            this.authService.createUser(email, password, name, this.verificationImageUrl, zipCode,
              school, emailOptIn, this.profileImageUrl).then(() => {
              this.loading = false;
            });
          });
        }
        if (this.isUpdate) {
          this.imageUploadService.uploadFile('profile-pictures', this.currentUser.email, this.profileImage).then(v => {
            this.profileImageUrl = v;
            const newUser: User = {school, zipCode, profileImage: this.profileImageUrl};
            this.authService.updateUser(newUser);
          });
        }
        if (this.isPasswordReset) {
          await this.afAuth.sendPasswordResetEmail(email);
          this.serverMessage = 'Check your email';
        }
      } catch (err) {
        this.serverMessage = err;
        this.loading = false;
      }
    } else {
      this.verificationWarnImage = true;
    }


  }

}
