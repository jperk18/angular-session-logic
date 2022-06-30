import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @Output() logOutClicked: EventEmitter<void> = new EventEmitter<void>()
  @Output() exploreClicked: EventEmitter<void> = new EventEmitter<void>()

  constructor() {
  }

  ngOnInit(): void {
  }

  logout() {
    this.logOutClicked.emit();
  }

  explore() {
    this.exploreClicked.emit();
  }
}
