import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {UserService} from '../../user/user.service';
import {SnackService} from '../../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
    private snack: SnackService,
  ) {
  }

  canActivate(): Observable<boolean> {
    return this.userService.getCurrentUser().pipe(first()).pipe(map(user => {
      if (user.role === 'admin') {
        return true;
      }
      this.snack.adminError();
      this.router.navigate(['/']);
    }));
  }

  //   return this.afAuth.user.pipe(first()).pipe(map(user => {
  //     if (user != null) {
  //       return true;
  //     }
  //     this.router.navigate(['/login']);
  //   })); // To make the observable complete after the first emission
  // }
}
