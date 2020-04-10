import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {StoryService} from '../../services/story.service';
import {Subscription} from 'rxjs';
import {User} from '../../user/user.model';
import {Story} from '../../services/story.model';
import {MatDialog} from '@angular/material/dialog';
import {VerifyDialogComponent} from '../verify-dialog/verify-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  storySub: Subscription;
  users: User[];
  stories: Story[];

  displayedColumns = ['displayName', 'school', 'verified', 'email', 'verificationImage', 'verify'];

  constructor(
    private userService: UserService,
    private storyService: StoryService,
    private dialog: MatDialog,
  ) {
  }

  get approvedUsers() {
    return this.users?.filter(user => user.verificationStatus);
  }

  get approvedStories() {
    return this.stories?.filter(story => story.reviewed);
  }

  ngOnInit(): void {
    this.userSub = this.userService.getAllUser().subscribe(users => {
      this.users = users;
    });
    this.storySub = this.storyService.getAllStories().subscribe(stories => {
      this.stories = stories;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.storySub.unsubscribe();
  }

  openDialog(data: User): void {
    const dialogRef = this.dialog.open(VerifyDialogComponent, {
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
