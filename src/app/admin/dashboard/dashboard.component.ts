import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {StoryService} from '../../services/story.service';
import {Subscription} from 'rxjs';
import {User} from '../../user/user.model';
import {Story} from '../../services/story.model';
import {MatDialog} from '@angular/material/dialog';
import {VerifyDialogComponent} from '../verify-dialog/verify-dialog.component';
import {SnackService} from '../../services/snack.service';
import {MatTableDataSource} from '@angular/material/table';

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
  userDataSource = new MatTableDataSource<User>();
  storyDataSource = new MatTableDataSource<Story>();

  displayedUserColumns = ['displayName', 'school', 'zipcode', 'email', 'id', 'verified', 'verificationImage', 'verify'];
  displayedStoryColumns = ['title', 'reviewed', 'author', 'image', 'id', 'story'];

  constructor(
    private userService: UserService,
    private storyService: StoryService,
    private dialog: MatDialog,
    private snackService: SnackService,
  ) {
  }

  get approvedUsers() {
    return this.users?.filter(user => user.verificationStatus === 'verified');
  }

  get approvedStories() {
    return this.stories?.filter(story => story.reviewed);
  }

  get rejectedUsers() {
    return this.users?.filter(user => user.verificationStatus === 'rejected');
  }

  get flaggedUsers() {
    return this.users?.filter(user => user.verificationStatus === 'flagged');
  }

  get waitingVerificationUser() {
    return this.users?.filter(user => user.verificationStatus === 'waiting verification');
  }

  ngOnInit(): void {
    this.userSub = this.userService.getAllUser().subscribe(users => {
      this.users = users;
      this.userDataSource.connect().next(this.users);
    });
    this.storySub = this.storyService.getAllStories().subscribe(stories => {
      this.stories = stories;
      this.storyDataSource.connect().next(this.stories);
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
      if (result) {
        this.snackService.error('User is now ' + result.event);
      } else if (result.error) {
        this.snackService.error('Error updating user! Check logs');
        console.error(result.error);
      }
    });
  }

}
