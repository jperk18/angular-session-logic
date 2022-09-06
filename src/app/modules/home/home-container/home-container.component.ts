import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as SessionManagement from "../../session-management";
import * as ProfileManagement from "../../profile-management";
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
  username$!: Observable<string>;
  isUser$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;
  isGuest$!: Observable<boolean>;

  constructor(private store: Store<SessionManagement.State>, private profileStore: Store<ProfileManagement.State>) {
    this.showExtendPopup$ = this.store.select(SessionManagement.Selectors.selectShowSessionPopup)
    this.username$ = this.profileStore.select(ProfileManagement.Selectors.selectProfileUserName).pipe(map(name => <string>name))
    this.customLoginResponse$ = this.profileStore.select(ProfileManagement.Selectors.selectProfileFullName).pipe(map(name => <string>name), map(name => `Hello ${name}`))
    
    //this.customLoginResponse$ = 
    // this.store.select(SessionManagement.Selectors.selectCustomLoginResponse<AppLoginResponse, AppLoginError>()).pipe(map(c =>
    //   c?.success?.greeting == undefined ? "Hello" : c.success.greeting
    // ))

    this.isGuest$ = this.profileStore.select(ProfileManagement.Selectors.selectProfileHasRole(ProfileManagement.Role.Guest))
    this.isAdmin$ = this.profileStore.select(ProfileManagement.Selectors.selectProfileHasRole(ProfileManagement.Role.Admin))
    this.isUser$ = this.profileStore.select(ProfileManagement.Selectors.selectProfileHasRole(ProfileManagement.Role.User))
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
