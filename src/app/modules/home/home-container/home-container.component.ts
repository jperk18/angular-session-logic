import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromSession from "../../session-management/store/reducers/session.reducer";
import {LogOut} from "../../session-management/store/actions/session.actions";

@Component({
  selector: 'home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  constructor(private store: Store<fromSession.State>) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(LogOut())
  }
}
