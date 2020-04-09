import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoryService} from '../services/story.service';
import {Subscription} from 'rxjs';
import {Story} from '../services/story.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  storySubscription: Subscription;
  stories: Story[];
  loading = true;

  constructor(
    public storyService: StoryService,
  ) { }

  ngOnInit(): void {
    this.storySubscription = this.storyService.getReviewedBoards().subscribe( stories => {
      this.loading = false;
      this.stories = stories;
    });
  }

  ngOnDestroy(): void {
    this.storySubscription.unsubscribe();
  }

}
