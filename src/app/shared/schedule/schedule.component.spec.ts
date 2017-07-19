import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleComponent } from './schedule.component';
import { ScheduleService } from '../../core/schedule/schedule.service';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleComponent],
      providers: [ScheduleService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
  });

  describe('onChanges()', () => {
    it('should recalculate the schedule', () => {
      const spy = spyOn(fixture.debugElement.injector.get(ScheduleService), 'recalculateSchedule');
      component.schedule = {
        time: '21:00'
      };
      component.timezone = 'America/Denver';
      expect(spy.calls.count()).toBe(0);
      component.ngOnChanges();
      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.mostRecent().args).toEqual([{time: '21:00'}, 'America/Denver']);
    });
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
});
