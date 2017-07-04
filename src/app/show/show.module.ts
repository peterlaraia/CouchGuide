import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ShowComponent } from './show.component';
import { showRoutes } from './show.routes';
import { ShowService } from './show.service';
import { ShowResolver } from "./show-resolver.service";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(showRoutes),
    SharedModule
  ],
  declarations: [ShowComponent],
  providers: [ShowService, ShowResolver]
})
export class ShowModule { }
