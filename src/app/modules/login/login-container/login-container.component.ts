import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserCredentials} from "../models";
import {Store} from "@ngrx/store";
import * as SessionManagement from "../../session-management";
import {AppUserCredentials} from "../../../__dummy/fake-config-and-service";

@Component({
  selector: 'login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit, OnDestroy {
  constructor(private store: Store<SessionManagement.State>) {
  }

  ngOnInit(): void {

  }

  logInClicked(event: UserCredentials) {
    let req: SessionManagement.LoginRequest<AppUserCredentials> = { credentials: {username: <string>event.username, password: <string>event.password}}
    this.store.dispatch(SessionManagement.Actions.Login(req))
  }

  ngOnDestroy(): void {
  }
}
