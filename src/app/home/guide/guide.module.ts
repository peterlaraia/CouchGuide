import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { GuideComponent } from './guide.component';
import { GuideSlotComponent } from './guide-slot/guide-slot.component';
import { GuideEffects } from './store/guide-effects';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.run(GuideEffects)
  ],
  declarations: [GuideComponent, GuideSlotComponent],
  exports: [GuideComponent]
})
export class GuideModule { }
