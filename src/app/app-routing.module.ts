import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home/home-page/home-page.component';
import {AuthGuard} from './user/auth.guard';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: 'login', loadChildren: () => import('./user/user.module').then(m => m.UserModule )
  },
  {
    path: 'stories', loadChildren: () => import('./stories/stories.module').then(m => m.StoriesModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
