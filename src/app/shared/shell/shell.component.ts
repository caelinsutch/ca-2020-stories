import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  sub: Subscription;
  hasStories = false;

  ngOnInit(): void {
    this.sub = this.userService.getCurrentUser().subscribe(user => {
      if (user?.stories) {
        this.hasStories = (user.stories.length !== 0);
      } else {
        this.hasStories = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  constructor(private breakpointObserver: BreakpointObserver, public afAuth: AngularFireAuth, public userService: UserService) {
  }

}
