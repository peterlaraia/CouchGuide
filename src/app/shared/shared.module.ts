import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaQueryModule } from '@pevil/media-query';
import { NgTabModule } from '@pevil/ng-tabs';
import { ScheduleComponent } from './schedule/schedule.component';
import { MiscInfoComponent } from './misc-info/misc-info.component';

@NgModule({
  imports: [
    CommonModule, MediaQueryModule, NgTabModule
  ],
  declarations: [ScheduleComponent, MiscInfoComponent],
  exports: [
    MediaQueryModule, 
    NgTabModule, 
    
    MiscInfoComponent, 
    ScheduleComponent]
})
export class SharedModule { }
