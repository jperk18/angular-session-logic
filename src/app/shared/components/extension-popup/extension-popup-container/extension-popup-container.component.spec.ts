import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { ExtensionPopupContainerComponent } from './extension-popup-container.component';

describe('ExtensionPopupContainerComponent', () => {
  let component: ExtensionPopupContainerComponent;
  let fixture: ComponentFixture<ExtensionPopupContainerComponent>;

  beforeAll((async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [ ExtensionPopupContainerComponent ]
    })
    .compileComponents();
  }))

  beforeEach((async () => {
    fixture = TestBed.createComponent(ExtensionPopupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
