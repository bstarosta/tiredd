import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubtireddRoutingModule } from './subtiredd-routing.module';
import { SubtireddPageComponent } from './subtiredd-page/subtiredd-page.component';


@NgModule({
  declarations: [
    SubtireddPageComponent
  ],
  imports: [
    CommonModule,
    SubtireddRoutingModule
  ]
})
export class SubtireddModule { }
