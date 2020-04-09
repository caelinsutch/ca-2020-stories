import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {StoryPageComponent} from './story-page/story-page.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [StoryPageComponent],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StoriesModule { }
