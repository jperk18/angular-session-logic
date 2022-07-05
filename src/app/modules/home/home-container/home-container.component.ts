import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as SessionManagement from "../../session-management";
import {Observable} from "rxjs";
import {AppLoginError, AppLoginResponse} from "../../../__dummy/fake-config-and-service";
import {map} from "rxjs/operators";

@Component({
  selector: 'home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {
  showExtendPopup$!: Observable<boolean>
  customLoginResponse$!: Observable<string>

  constructor(private store: Store<SessionManagement.State>) {
    this.showExtendPopup$ = this.store.select(SessionManagement.Selectors.selectShowSessionPopup)
    this.customLoginResponse$ = this.store.select(SessionManagement.Selectors.selectCustomLoginResponse<AppLoginResponse, AppLoginError>()).pipe(map(c =>
      c?.success?.greeting == undefined ? "Hello" : c.success.greeting
    ))
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(SessionManagement.Actions.LogOut())
  }

  explore() {
    this.store.dispatch(SessionManagement.Actions.RefreshSession({}))
  }
}
