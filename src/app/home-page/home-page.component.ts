import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoryService} from '../services/story.service';
import {Subscription} from 'rxjs';
import {Story} from '../services/story.model';
import {SeoService} from '../shared/seo.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  storySubscription: Subscription;
  stories: Story[];
  loading = true;
  searchText: string;
  containerFluid = false;
  breakPointSubscription: Subscription;

  constructor(
    public storyService: StoryService,
    private seoService: SeoService,
    public breakpointObserver: BreakpointObserver,
  ) {
  }

  ngOnInit(): void {
    this.breakPointSubscription = this.breakpointObserver.observe(['(max-width: 992px)']).subscribe((state: BreakpointState) => {
      console.log(state.matches);
      this.containerFluid = state.matches;
    });

    this.storySubscription = this.storyService.getReviewedStories().subscribe(stories => {
      this.loading = false;
      this.stories = stories;
      this.seoService.generateTags({
        title: 'CA 2020 Stories',
        description: 'Stories from seniors around California',
        type: 'blog', // TOOD put image
      });
    });
  }

  ngOnDestroy(): void {
    this.breakPointSubscription.unsubscribe();
    this.storySubscription.unsubscribe();
  }

}
