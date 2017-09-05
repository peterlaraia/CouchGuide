import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { ShowComponent } from './show.component';
import { showRoutes } from './show.routes';
import { ShowService } from './services/show.service';
import { SharedModule } from '../shared/shared.module';
import { ShowEffects } from './store/show-effects';
import { NextEpisodeComponent } from './next-episode/next-episode.component';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.run(ShowEffects),
    RouterModule.forChild(showRoutes),
    SharedModule
  ],
  declarations: [ShowComponent, NextEpisodeComponent],
  providers: [ShowService]
})
export class ShowModule { }
