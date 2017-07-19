import { TestBed, inject } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';
import { Schedule } from '../../models/schedule';

describe('ScheduleService !MUST RUN AGAINST SYSTEM USING CENTRAL TIMEZONE!', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleService]
    });
  });

  describe('week', () => {
    it('should represent a week from Sunday to Saturday', inject([ScheduleService], (service: ScheduleService) => {
      expect(service.week).toEqual([
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ]);
    }));
  });

  describe('recalculateSchedule()', () => {
    it('should return given schedule if args undefined', inject([ScheduleService], (service: ScheduleService) => {
      const schedule: Schedule = {
        time: '21:00', days: ['Monday', 'Wednesday']
      };
      expect(service.recalculateSchedule(undefined, 'America/Denver')).toEqual({});
      expect(service.recalculateSchedule(schedule, undefined)).toEqual(schedule);
    }));

    it('should return the same schedule if timezone is system timezone',
      inject([ScheduleService], (service: ScheduleService) => {
        const schedule: Schedule = {
          time: '21:00', days: ['Monday', 'Wednesday']
        };
        expect(service.recalculateSchedule(schedule, 'America/Chicago')).toEqual(schedule);
      }));

    it('should shift the schedule backward if given timezone ahead of system timezone',
      inject([ScheduleService], (service: ScheduleService) => {
        const schedule: Schedule = {
          time: '3:00', days: ['Sunday', 'Wednesday']
        };
        expect(service.recalculateSchedule(schedule, 'Europe/Berlin')).toEqual({
          time: '20:00', days: ['Saturday', 'Tuesday']
        });
      }));

    it('should shift the schedule forward if given timezone behind system timezone',
      inject([ScheduleService], (service: ScheduleService) => {
        const schedule: Schedule = {
          time: '23:30', days: ['Monday', 'Wednesday', 'Saturday']
        };
        expect(service.recalculateSchedule(schedule, 'America/Los_Angeles')).toEqual({
          time: '1:30', days: ['Tuesday', 'Thursday', 'Sunday']
        });
      }));
  });

  it('should be created', inject([ScheduleService], (service: ScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
