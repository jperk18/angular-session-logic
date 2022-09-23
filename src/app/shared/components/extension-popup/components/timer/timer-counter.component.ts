import {Component, Input, OnInit} from '@angular/core';
import {interval, Observable, shareReplay, takeWhile} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'timer-counter',
  templateUrl: './timer-counter.component.html',
  styleUrls: ['./timer-counter.component.scss']
})
export class TimerCounterComponent implements OnInit {
  @Input() dateTime!: Date;
  @Input() displayFrequency: "day" | "hour" | "minute" | "second" = "minute"
  timeLeft$: Observable<timeComponents>

  constructor() {
    this.timeLeft$ = interval(50).pipe(
      map(x => this.calcDateDiff(this.dateTime)),
      takeWhile(x => this.dateTime > new Date()),
      shareReplay(1)
    );
  }

  ngOnInit(): void {
  }

  calcDateDiff(endDay: Date): timeComponents {
    const dDay = endDay.valueOf();

    const milliSecondsInASecond = 1000;
    const hoursInADay = 24;
    const minutesInAnHour = 60;
    const secondsInAMinute = 60;

    const timeDifference = dDay - Date.now();

    const daysToDday = Math.floor(
      timeDifference /
      (milliSecondsInASecond * minutesInAnHour * secondsInAMinute * hoursInADay)
    );

    const hoursToDday = Math.floor(
      (timeDifference /
        (milliSecondsInASecond * minutesInAnHour * secondsInAMinute)) %
      hoursInADay
    );

    const minutesToDday = Math.floor(
      (timeDifference / (milliSecondsInASecond * minutesInAnHour)) %
      secondsInAMinute
    );

    const secondsToDday =
      Math.floor(timeDifference / milliSecondsInASecond) % secondsInAMinute;

    return { secondsToDday, minutesToDday, hoursToDday, daysToDday };
  }
}

interface timeComponents {
  secondsToDday: number;
  minutesToDday: number;
  hoursToDday: number;
  daysToDday: number;
}
