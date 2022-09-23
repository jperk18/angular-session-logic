import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionPopupContainerComponent } from './extension-popup-container.component';

describe('ExtensionPopupContainerComponent', () => {
  let component: ExtensionPopupContainerComponent;
  let fixture: ComponentFixture<ExtensionPopupContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensionPopupContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionPopupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
