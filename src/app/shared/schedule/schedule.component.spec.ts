import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleComponent } from './schedule.component';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('isDayInSchedule()', () => {
    it('should indicate day is in schedule', () => {
      expect(component.isDayInSchedule('Monday', ['Monday', 'Tuesday'])).toBeTruthy();
      expect(component.isDayInSchedule('Monday', ['monday', 'tuesday', 'wednesday']));
      expect(component.isDayInSchedule('Thursday', ['Thursday'])).toBeTruthy();
    });

    it('should indicate day is not in schedule', () => {
      expect(component.isDayInSchedule('Sunday', ['Monday'])).toBeFalsy();
      expect(component.isDayInSchedule('Tuesday', ['Monday', 'Wednesday', 'Thursday']));

      expect(component.isDayInSchedule('Mon', null)).toBeFalsy();
      expect(component.isDayInSchedule(null, ['Friday'])).toBeFalsy();
    });
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
