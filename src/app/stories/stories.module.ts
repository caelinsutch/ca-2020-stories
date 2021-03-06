import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoriesRoutingModule} from './stories-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StoryPageComponent} from './story-page/story-page.component';
import {SharedModule} from '../shared/shared.module';
import {NewStoryPageComponent} from './new-story-page/new-story-page.component';
import {MarkdownModule} from 'ngx-markdown';


@NgModule({
  declarations: [StoryPageComponent, NewStoryPageComponent],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MarkdownModule.forChild(),
  ]
})
export class StoriesModule { }
