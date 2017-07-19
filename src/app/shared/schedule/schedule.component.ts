import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';

import { ScheduleService } from '../../core/schedule/schedule.service';
import { Schedule } from '../../models/schedule';

@Component({
  selector: 'cg-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnChanges {

  @Input() schedule: Schedule;
  private localSchedule;
  @Input() timezone: string;

  constructor(private scheduleService: ScheduleService) {}

  get date(): Date {
    return new Date();
  }

  get week(): string[] {
    return this.scheduleService.week;
  }

  ngOnChanges() {
    this.localSchedule = this.scheduleService.recalculateSchedule(this.schedule, this.timezone);
  }

  isDayInSchedule(day: string, schedule: string[]): boolean {
    return schedule && day &&
      schedule.map((scheduleDay: string) => scheduleDay.toLocaleLowerCase())
        .indexOf(day.toLocaleLowerCase()) >= 0;
  }
}
