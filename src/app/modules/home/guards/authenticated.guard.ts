import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import * as fromSession from "../../session-management/store/reducers/session.reducer";
import {selectIsUserLoggedIn} from "../../session-management/store/selectors/session.selectors";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private store: Store<fromSession.State>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectIsUserLoggedIn)
  }

}
