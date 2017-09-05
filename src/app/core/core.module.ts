import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodeService } from './episode/episode.service';
import { ScheduleService } from './schedule/schedule.service';
import { SslService } from './ssl/ssl.service';

@NgModule({
  providers: [
    ScheduleService, SslService, EpisodeService
  ]
})
export class CoreModule {
}
