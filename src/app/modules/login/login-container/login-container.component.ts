import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserCredentials} from "../models";
import {Store} from "@ngrx/store";
import * as fromSession from "../../session-management/store/reducers/session.reducer";
import {Login} from "../../session-management/store/actions/session.actions";
import {selectIsUserLoggedIn} from "../../session-management/store/selectors/session.selectors";
import {filter, Observable, Subject, Subscription, takeUntil, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit, OnDestroy {
  private isUserLoggedIn: Observable<boolean>
  private readonly isUserLoggedInSubscription$: Subscription
  private subscriptions: Subscription[] = []

  constructor(private store: Store<fromSession.State>, private router: Router) {
    this.isUserLoggedIn = this.store.select(selectIsUserLoggedIn)
    this.isUserLoggedInSubscription$ = this.isUserLoggedIn.pipe(
      filter(x => x),
      tap(x => {
        this.router.navigate(['/home'])
      })
    ).subscribe()
  }

  ngOnInit(): void {
    this.subscriptions.push(this.isUserLoggedInSubscription$)
  }

  logInClicked(event: UserCredentials) {
    this.store.dispatch(Login({username: <string>event.username, password: <string>event.password}))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
