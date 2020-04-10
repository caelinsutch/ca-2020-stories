import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../user/user.model';

@Component({
  selector: 'app-verify-dialog',
  templateUrl: './verify-dialog.component.html',
  styleUrls: ['./verify-dialog.component.scss']
})
export class VerifyDialogComponent {

  localData: User;

  constructor(
    public dialogRef: MatDialogRef<VerifyDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User) {
    this.localData = data;
  }

  verify() {
    this.dialogRef.close({event: 'verified'});
  }

  flag() {
    this.dialogRef.close({event: 'flag'});
  }

  reject() {
    this.dialogRef.close({event: 'reject'});
  }

}
