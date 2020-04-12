import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {SnackService} from '../../services/snack.service';
import {User} from '../user.model';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.scss']
})
export class UpdatePageComponent implements OnInit {
  updateForm: FormGroup;
  loading = false;
  currentUser: User;
  dataLoading = true;

  get name() {
    return this.updateForm.get('name');
  }

  get zipCode() {
    return this.updateForm.get('zipCode');
  }

  get school() {
    return this.updateForm.get('school');
  }

  // get profileImage() {
  //   return this.updateForm.get('profileImage');
  // }
  get emailOptIn() {
    return this.updateForm.get('emailOptIn');
  }
  //
  // setProfileImage(value: string) {
  //   this.profileImage.setValue(value);
  // }

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private snack: SnackService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().pipe(first()).subscribe(user => {
      console.log(user);
      this.dataLoading = false;
      this.currentUser = user;
      this.updateForm = this.fb.group({
        name: [user.displayName, [Validators.required]],
        zipCode: [user.zipCode, [Validators.minLength(5), Validators.maxLength(5)]],
        school: [user.school, [Validators.required]],
        emailOptIn: [user.permissions.emailOptIn, []],
      });
    });
  }

  onSubmit() {
    this.loading = true;
    const name = this.name.value;
    const zipCode = this.zipCode.value;
    const school = this.school.value;
    // const profileUrl = this.profileImage.value;
    const emailOptIn = this.emailOptIn.value;
    try {
      this.userService.updateUser({displayName: name, zipCode, school, permissions: {emailOptIn}}).then(() => {
        this.snack.error('Updated Account!');
        this.loading = false;
      });
    } catch (e) {
      this.snack.error(e);
    }
  }

}
