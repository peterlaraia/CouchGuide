import { Injectable } from '@angular/core';
import { Schedule } from '../../models/schedule';

@Injectable()
export class ScheduleService {

  private static readonly MILLIS_PER_MINUTE: number = 60 * 1000;
  private static readonly MINUTES_PER_DAY: number = 24 * 60;

  private readonly WEEK: string[] = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  get week(): string[] {
    return this.WEEK;
  }

  recalculateSchedule(schedule: Schedule, timezone: string): Schedule {
    if (!timezone || !schedule) {
      return {
        ...schedule
      };
    }
    const browserDate: Date = new Date();
    const givenTzDate: Date = new Date(browserDate.toLocaleString('en-US', {timeZone: timezone}));

    const offsetInMinutes: number = Math.floor((browserDate.getTime() - givenTzDate.getTime()) / ScheduleService.MILLIS_PER_MINUTE);
    const base: number = this.timeStringToMinutes(schedule.time);

    const updatedTimeInMinutes: number = base + offsetInMinutes;

    return this.reconstructSchedule(updatedTimeInMinutes, schedule.days);
  }

  private reconstructSchedule(minutes: number, days: string[]): Schedule {
    if (minutes < 0) {
      const timeInMinutes: number = (ScheduleService.MINUTES_PER_DAY + minutes);
      return {
        time: this.buildTimeString(timeInMinutes),
        days: this.shiftBackwards(days)
      };
    } else if (minutes > ScheduleService.MINUTES_PER_DAY) {
      const timeInMinutes: number = (minutes % ScheduleService.MINUTES_PER_DAY);
      return {
        time: this.buildTimeString(timeInMinutes),
        days: this.shiftForwards(days)
      };
    }
    return {
      time: this.buildTimeString(minutes),
      days: days.slice()
    };
  }

  public getIntervalSteps(base: string, numSteps: number): string[] {
    let minutes = this.timeStringToMinutes(base);
    if (minutes % 30 !== 0) {
      minutes = minutes + (30 - (minutes % 30));
    }

    const steps: string[] = [];
    for (let i = 0; i < numSteps; i++) {
      if (minutes >= 24 * 60) {
        minutes -= 24 * 60;
      }
      steps.push(this.buildTimeString(minutes))
      minutes += 30;
    }
    return steps;
  }

  public buildTimeString(timeInMinutes: number): string {
    const hours: number = Math.floor(timeInMinutes / 60);
    const minutes: number = timeInMinutes % 60;
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }

  public timeStringToMinutes(time: string): number {
    const [hours, minutes] = time.split(':');
    return (+hours * 60) + +minutes;
  }



  private shiftBackwards(days: string[]): string[] {
    const shifted = [];
    days.forEach((day: string) => {
      shifted.push(this.yesterday(day));
    });
    return shifted;
  }

  private shiftForwards(days: string[]): string[] {
    const shifted = [];
    days.forEach((day: string) => {
      shifted.push(this.tomorrow(day));
    });
    return shifted;
  }

  private yesterday(day: string): string {
    const idx = this.week.indexOf(day);
    return this.week[idx === 0 ? this.week.length - 1 : idx - 1];
  }

  private tomorrow(day: string): string {
    const idx = this.week.indexOf(day);
    return this.week[idx === this.week.length - 1 ? 0 : idx + 1];
  }
}
