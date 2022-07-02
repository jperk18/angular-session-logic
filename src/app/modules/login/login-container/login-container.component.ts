import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserCredentials} from "../models";
import {Store} from "@ngrx/store";
import * as fromSession from "../../session-management/store/reducers/session.reducer";
import {Login} from "../../session-management/store/actions/session.actions";
import {LoginRequest} from "../../session-management/services/authentication/models";
import {AppUserCredentials} from "../../../__dummy/fake-config-and-service";

@Component({
  selector: 'login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromSession.State>) {
  }

  ngOnInit(): void {

  }

  logInClicked(event: UserCredentials) {
    let req: LoginRequest<AppUserCredentials> = { credentials: {username: <string>event.username, password: <string>event.password}}
    this.store.dispatch(Login(req))
  }

  ngOnDestroy(): void {
  }
}
