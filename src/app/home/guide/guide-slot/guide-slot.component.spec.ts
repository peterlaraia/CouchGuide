import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideSlotComponent } from './guide-slot.component';

describe('GuideSlotComponent', () => {
  let component: GuideSlotComponent;
  let fixture: ComponentFixture<GuideSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
