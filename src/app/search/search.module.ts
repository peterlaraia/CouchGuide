import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { ResultsComponent } from './results/results.component';
import { SearchComponent } from './search.component';
import { searchRoutes } from './search.routes';
import { SearchService } from './search.service';
import { SharedModule } from '../shared/shared.module';
import { SearchEffects } from './store/search-effects';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.run(SearchEffects),
    ReactiveFormsModule,
    RouterModule.forChild(searchRoutes),
    SharedModule
  ],
  declarations: [SearchComponent, ResultsComponent],
  providers: [SearchService],
  exports: [SearchComponent]
})
export class SearchModule { }
