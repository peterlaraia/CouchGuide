import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaQueryModule } from '@pevil/media-query';
import { NgTabModule } from '@pevil/ng-tabs';

@NgModule({
  imports: [
    CommonModule, MediaQueryModule, NgTabModule
  ],
  declarations: [],
  exports: [MediaQueryModule, NgTabModule]
})
export class SharedModule { }
