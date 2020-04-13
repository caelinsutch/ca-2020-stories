import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {AdminGuard} from './shared/auth/admin.guard';
import {NotFoundPageComponent} from './shared/not-found-page/not-found-page.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: 'auth', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'stories', loadChildren: () => import('./stories/stories.module').then(m => m.StoriesModule)
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard]
  },
  {
    path: '**', component: NotFoundPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
