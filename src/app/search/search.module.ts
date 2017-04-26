import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { SearchComponent } from './search.component';
import { searchRoutes } from './search.routes';
import { SearchService } from './search.service';
import { SearchEffects } from './store/search-effects';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.run(SearchEffects),
    ReactiveFormsModule,
    RouterModule.forChild(searchRoutes)
  ],
  declarations: [SearchComponent],
  providers: [SearchService],
  exports: [SearchComponent]
})
export class SearchModule { }
