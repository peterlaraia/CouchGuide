import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaQuery } from './media-query/media-query.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MediaQuery],
  exports: [MediaQuery]
})
export class SharedModule { }
