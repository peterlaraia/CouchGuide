import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaQueryModule } from '@pevil/media-query';
import { TabDirective } from "./tabs/tab.directive";
import { TabGroupDirective } from "./tabs/tab-group.directive";
import { TabPanelComponent } from './tabs/tab-panel.component';

@NgModule({
  imports: [
    CommonModule, MediaQueryModule
  ],
  declarations: [TabGroupDirective, TabDirective, TabPanelComponent],
  exports: [MediaQueryModule, TabGroupDirective, TabDirective, TabPanelComponent]
})
export class SharedModule { }
