import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {SnackService} from '../services/snack.service';
import {first, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private afAuth: AngularFireAuth, private router: Router, private snackService: SnackService) { }

  canActivate(): Observable<boolean> {
    return this.afAuth.user.pipe(first()).pipe(map(user => {
      if (user != null) {
        return true;
      }
      this.snackService.error('You must be logged in!');
      this.router.navigate(['/auth/login']);
    })); // To make the observable complete after the first emission
  }
}
