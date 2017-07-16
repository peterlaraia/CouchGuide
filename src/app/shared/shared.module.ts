import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaQueryModule } from '@pevil/media-query';
import { NgTabModule } from '@pevil/ng-tabs';
import { HandshakeComponent } from './handshake.component';
import { MiscInfoComponent } from './misc-info/misc-info.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ClearPlaceholderDirective } from './clear-placeholder.directive';


@NgModule({
  imports: [
    CommonModule, MediaQueryModule, NgTabModule
  ],
  declarations: [ScheduleComponent, HandshakeComponent, MiscInfoComponent, ClearPlaceholderDirective],
  exports: [
    MediaQueryModule,
    NgTabModule,

    HandshakeComponent,
    MiscInfoComponent,
    ScheduleComponent,

    ClearPlaceholderDirective
  ]
})
export class SharedModule { }
