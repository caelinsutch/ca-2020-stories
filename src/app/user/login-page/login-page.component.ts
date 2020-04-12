import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  loading = false;
  serverMessage: string; // Server response

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get password() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }

  async onSubmit() {
    this.loading = true;
    const email = this.email.value;
    const password = this.password.value;
    try {
      await this.userService.loginUser(email, password).then(v => {
        this.loading = false;
        this.router.navigateByUrl('/');
      });
    } catch (e) {
      this.loading = false;
      this.serverMessage = e;
    }
  }

}
