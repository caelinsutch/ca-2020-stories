import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {StoryService} from '../../services/story.service';
import {Story} from '../../services/story.model';
import {UserService} from '../../user/user.service';
import {User} from '../../user/user.model';

@Component({
  selector: 'app-story-page',
  templateUrl: './story-page.component.html',
  styleUrls: ['./story-page.component.scss']
})
export class StoryPageComponent implements OnInit, OnDestroy {

  private id: string;
  private routerSub: Subscription;
  private serviceSub: Subscription;
  private userSub: Subscription;
  public story: Story;
  public author: User;

  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.routerSub = this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.serviceSub = this.storyService.getStoryById(this.id).subscribe(story => {
      this.story = story;
      this.userSub = this.userService.getUserById(this.story.uid).subscribe(user => {
        this.author = user;
      });
    });

  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    this.serviceSub.unsubscribe();
  }

}
