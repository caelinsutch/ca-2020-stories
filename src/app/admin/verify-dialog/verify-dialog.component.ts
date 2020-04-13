import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../user/user.model';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-verify-dialog',
  templateUrl: './verify-dialog.component.html',
  styleUrls: ['./verify-dialog.component.scss']
})
export class VerifyDialogComponent {

  localData: User;

  constructor(
    public dialogRef: MatDialogRef<VerifyDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
  ) {
    this.localData = data;
  }

  verify() {
    this.updateUser('verified');
  }

  flag() {
    this.updateUser('flagged');
  }

  reject() {
    this.updateUser('rejected');
  }

  waiting() {
    this.updateUser('waiting verification');
  }

  private updateUser(newStatus: 'verified' | 'flagged' | 'rejected' | 'waiting verification') {
    try {
      console.log('Setting new status', newStatus);
      this.userService.updateUserById(this.localData.uid, {verificationStatus: newStatus}).then(v => {
        this.dialogRef.close({event: newStatus});
      });
    } catch (e) {
      this.dialogRef.close({error: e});
    }
  }

}
