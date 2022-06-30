import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromSession from "../../session-management/store/reducers/session.reducer";
import {LogOut, RefreshToken} from "../../session-management/store/actions/session.actions";
import {selectTokenExpiryDateTime} from "../../session-management/store/selectors/session.selectors";
import {Observable} from "rxjs";
import * as moment from "moment";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-extension-popup-container',
  templateUrl: './extension-popup-container.component.html',
  styleUrls: ['./extension-popup-container.component.scss']
})
export class ExtensionPopupContainerComponent implements OnInit {
  expiryDateTime$!: Observable<Date>;

  constructor(private store: Store<fromSession.State>) {
    this.expiryDateTime$ = this.store.select(selectTokenExpiryDateTime).pipe(
      map(c => c != undefined ? new Date(c) : moment().add(5, "minute").toDate())
    )
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(LogOut())
  }

  extendSession() {
    this.store.dispatch(RefreshToken())
  }
}
