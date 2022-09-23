
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as SessionManagement from '@core/session-management'

@Injectable()
export class LoginAuthGuard implements CanActivate {
  routeURL: string;

  constructor(private store: Store<SessionManagement.State>, private router: Router) {
    this.routeURL = this.router.url;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(SessionManagement.Selectors.selectIsUserLoggedIn).pipe(
        map((authenicated) => {
          if (authenicated) {
            this.routeURL = '/home';
            this.router.navigate(['/home']);
            return false;
          } else {
            return true;
          }
        })
      );
  }
}