import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoryPageComponent} from './story-page/story-page.component';
import {NewStoryPageComponent} from './new-story-page/new-story-page.component';
import {AuthGuard} from '../user/auth.guard';


const routes: Routes = [
  {path: '', component: NewStoryPageComponent, canActivate: [AuthGuard]},
  {path: ':id', component: StoryPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoriesRoutingModule { }
