import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import * as SessionManagement from "../../session-management";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private store: Store<SessionManagement.State>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(SessionManagement.Selectors.selectIsUserLoggedIn)
  }

}
