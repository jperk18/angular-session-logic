import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromSession from "../../session-management/store/reducers/session.reducer";
import {LogOut, RefreshToken} from "../../session-management/store/actions/session.actions";
import {selectShowSessionPopup} from "../../session-management/store/selectors/session.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {
  showExtendPopup$!: Observable<boolean>

  constructor(private store: Store<fromSession.State>) {
    this.showExtendPopup$ = this.store.select(selectShowSessionPopup)
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(LogOut())
  }

  explore() {
    this.store.dispatch(RefreshToken({forceSessionExtension: false}))
  }
}
