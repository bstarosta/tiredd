import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubtireddRoutingModule } from './subtiredd-routing.module';
import { SubtireddPageComponent } from './subtiredd-page/subtiredd-page.component';
import { PostPageComponent } from './post-page/post-page.component';


@NgModule({
  declarations: [
    SubtireddPageComponent,
    PostPageComponent
  ],
  imports: [
    CommonModule,
    SubtireddRoutingModule
  ]
})
export class SubtireddModule { }
