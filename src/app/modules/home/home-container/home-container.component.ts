import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as SessionManagement from "../../session-management";
import {Observable} from "rxjs";

@Component({
  selector: 'home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {
  showExtendPopup$!: Observable<boolean>

  constructor(private store: Store<SessionManagement.State>) {
    this.showExtendPopup$ = this.store.select(SessionManagement.Selectors.selectShowSessionPopup)
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(SessionManagement.Actions.LogOut())
  }

  explore() {
    this.store.dispatch(SessionManagement.Actions.RefreshSession({forceSessionExtension: false}))
  }
}
