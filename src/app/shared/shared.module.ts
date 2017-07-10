import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaQueryModule } from '@pevil/media-query';

@NgModule({
  imports: [
    CommonModule, MediaQueryModule
  ],
  exports: [MediaQueryModule]
})
export class SharedModule { }
