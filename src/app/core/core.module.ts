import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleService } from './schedule/schedule.service';

@NgModule({
  providers: [
    ScheduleService
  ]
})
export class CoreModule {
}
