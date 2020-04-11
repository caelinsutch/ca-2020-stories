import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {SnackService} from '../../services/snack.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private snack: SnackService,
  ) { }

  get mainInformation() {
    return this.registrationForm.get('mainInformation');
  }

  get verificationInformation() {
    return this.registrationForm.get('verificationInformation');
  }

  get name() {
    return this.mainInformation.get('name');
  }

  get zipCode() {
    return this.verificationInformation.get('zipCode');
  }

  get school() {
    return this.verificationInformation.get('school');
  }

  get email() {
    return this.mainInformation.get('email');
  }

  get emailOptIn() {
    return this.verificationInformation.get('emailOptIn');
  }

  get password() {
    return this.mainInformation.get('password');
  }

  get passwordConfirm() {
    return this.mainInformation.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    return this.password.value === this.passwordConfirm.value;
  }

  get verificationImage() {
    return this.registrationForm.get('verificationImage');
  }

  setVerificationImage(value: string) {
    this.verificationImage.setValue(value);
  }

  get profileImage() {
    return this.registrationForm.get('profileImage');
  }

  setProfileImage(value: string) {
    this.profileImage.setValue(value);
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      mainInformation: this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(6), Validators.required]],
        passwordConfirm: ['', [Validators.required]],
      }),
      verificationInformation: this.fb.group(({
        zipCode: ['', [Validators.minLength(5), Validators.maxLength(5)]],
        school: ['', [Validators.required]],
        emailOptIn: [true, []],
      })),
      verificationImage: ['', [Validators.required]],
      profileImage: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;
    const name = this.name.value;
    const zipCode = this.zipCode.value;
    const school = this.school.value;
    const verificationUrl = this.verificationImage.value;
    const profileUrl = this.profileImage.value;
    const emailOptIn = this.emailOptIn.value;

    try {
      this.userService.createUser(email, password, name, verificationUrl, zipCode, school, emailOptIn, profileUrl).then(() => {
        this.loading = false;
        this.router.navigateByUrl('/');
      });
    } catch (e) {
      this.snack.error(e);
    }
  }
}
