import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleService } from './timezone/timezone.service';

@NgModule({
  providers: [
    ScheduleService
  ]
})
export class CoreModule {
}
