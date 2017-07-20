import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleService } from './schedule/schedule.service';
import { SslService } from './ssl/ssl.service';

@NgModule({
  providers: [
    ScheduleService, SslService
  ]
})
export class CoreModule {
}
