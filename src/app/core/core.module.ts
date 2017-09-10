import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateUtilsService } from "./date/date-utils.service";
import { EpisodeService } from './episode/episode.service';
import { ScheduleService } from './schedule/schedule.service';
import { SslService } from './ssl/ssl.service';

@NgModule({
  providers: [
    DateUtilsService, ScheduleService, SslService, EpisodeService
  ]
})
export class CoreModule {
}
