import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubtireddRoutingModule } from './subtiredd-routing.module';
import { SubtireddPageComponent } from './subtiredd-page/subtiredd-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { SubtireddHeaderComponent } from './subtiredd-header/subtiredd-header.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    SubtireddPageComponent,
    PostPageComponent,
    SubtireddHeaderComponent
  ],
    imports: [
        CommonModule,
        SubtireddRoutingModule,
        SharedModule
    ]
})
export class SubtireddModule { }
