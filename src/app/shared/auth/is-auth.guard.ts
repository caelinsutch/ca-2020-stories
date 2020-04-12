import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {first, map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {SnackService} from '../../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private snack: SnackService) { }

  canActivate(): Observable<boolean> {
    return this.afAuth.user.pipe(first()).pipe(map(user => {
      if (user == null) {
        return true;
      }
      this.snack.error('You already are logged in!');
      this.router.navigateByUrl('/auth/update');
    })); // To make the observable complete after the first emission
  }
}
