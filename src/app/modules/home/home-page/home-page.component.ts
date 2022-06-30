import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as moment from "moment";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @Output() logOutClicked: EventEmitter<void> = new EventEmitter<void>()
  time: Date

  constructor() {
    this.time = moment().add(5, "minute").toDate()
  }

  ngOnInit(): void {
  }

  logout() {
    this.logOutClicked.emit();
  }
}
