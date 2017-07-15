import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cg-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent {

  @Input() time: string;
  @Input() days: string[];
  @Input() timezone: string;

  readonly week: string[] = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  isDayInSchedule(day: string, schedule: string[]): boolean {
    return schedule && day &&
      schedule.map((scheduleDay: string) => scheduleDay.toLocaleLowerCase())
        .indexOf(day.toLocaleLowerCase()) >= 0;
  }

}