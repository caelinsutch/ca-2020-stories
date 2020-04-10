import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {StoryService} from '../../services/story.service';
import {Subscription} from 'rxjs';
import {User} from '../../user/user.model';
import {Story} from '../../services/story.model';

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

  constructor(
    private userService: UserService,
    private storyService: StoryService,
  ) {
  }

  get approvedUsers() {
    return this.users?.filter(user => user.verified);
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

}
