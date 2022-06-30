import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerCounterComponent } from './timer-counter.component';

describe('TimerCounterComponent', () => {
  let component: TimerCounterComponent;
  let fixture: ComponentFixture<TimerCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerCounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
