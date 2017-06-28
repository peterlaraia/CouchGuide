import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ShowComponent } from './show.component';
import { showRoutes } from './show.routes';
import { ShowService } from './show.service';
import { ShowResolver } from "./show-resolver.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(showRoutes)
  ],
  declarations: [ShowComponent],
  providers: [ShowService, ShowResolver]
})
export class ShowModule { }
