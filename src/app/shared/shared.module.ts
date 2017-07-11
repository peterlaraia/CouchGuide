import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaQueryModule } from '@pevil/media-query';
import { TabDirective } from './tabs/tab.directive';
import { TabGroupDirective } from './tabs/tab-group.directive';
import { TabPanelDirective } from './tabs/tab-panel.directive';

@NgModule({
  imports: [
    CommonModule, MediaQueryModule
  ],
  declarations: [TabGroupDirective, TabDirective, TabPanelDirective],
  exports: [MediaQueryModule, TabGroupDirective, TabDirective, TabPanelDirective]
})
export class SharedModule { }
