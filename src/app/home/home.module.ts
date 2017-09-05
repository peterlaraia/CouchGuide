import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { GuideModule } from './guide/guide.module';

@NgModule({
  imports: [
    CommonModule, GuideModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
