import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {SharedModule} from './shared/shared.module';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {HomePageComponent} from './home-page/home-page.component';
import {MarkdownModule} from 'ngx-markdown';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    SharedModule,
    MarkdownModule.forRoot(),
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
