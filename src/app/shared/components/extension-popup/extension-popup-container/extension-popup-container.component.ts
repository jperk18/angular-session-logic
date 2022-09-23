import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as SessionManagement from '@core/session-management'
import {Observable} from "rxjs";

@Component({
  selector: 'app-extension-popup-container',
  templateUrl: './extension-popup-container.component.html',
  styleUrls: ['./extension-popup-container.component.scss']
})
export class ExtensionPopupContainerComponent implements OnInit {
  expiryDateTime$!: Observable<Date | undefined>;

  constructor(private store: Store<SessionManagement.State>) {
    this.expiryDateTime$ = this.store.select(SessionManagement.Selectors.selectTokenExpiryDateTime)
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(SessionManagement.Actions.LogOut())
  }

  extendSession() {
    this.store.dispatch(SessionManagement.Actions.RefreshSession({forceSessionExtension: true}))
  }
}
