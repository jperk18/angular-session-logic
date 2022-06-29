import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserCredentials} from "../models";

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  @Output() logIn : EventEmitter<UserCredentials> = new EventEmitter<UserCredentials>()
  constructor() { }

  userInfo: UserCredentials = new UserCredentials()

  ngOnInit(): void {
  }

  login(){
    this.logIn.emit(this.userInfo)
  }
}
