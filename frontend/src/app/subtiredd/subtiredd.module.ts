import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubtireddRoutingModule} from './subtiredd-routing.module';
import {SubtireddPageComponent} from './subtiredd-page/subtiredd-page.component';
import {PostPageComponent} from './post-page/post-page.component';
import {SubtireddHeaderComponent} from './subtiredd-header/subtiredd-header.component';
import {SharedModule} from "../shared/shared.module";
import {AboutCommunityComponent} from './about-community/about-community.component';


@NgModule({
  declarations: [
    SubtireddPageComponent,
    PostPageComponent,
    SubtireddHeaderComponent,
    AboutCommunityComponent
  ],
  imports: [
    CommonModule,
    SubtireddRoutingModule,
    SharedModule
  ]
})
export class SubtireddModule {
}
