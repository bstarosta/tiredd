import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubtireddRoutingModule} from './subtiredd-routing.module';
import {SubtireddPageComponent} from './subtiredd-page/subtiredd-page.component';
import {PostPageComponent} from './post-page/post-page.component';
import {SubtireddHeaderComponent} from './subtiredd-header/subtiredd-header.component';
import {SharedModule} from "../shared/shared.module";
import {AboutCommunityComponent} from './about-community/about-community.component';
import {CommentsComponent} from './post-page/comments/comments.component';
import {CreateCommentComponent} from './post-page/create-comment/create-comment.component';
import {CommentsListComponent} from './post-page/comments-list/comments-list.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import { CommunityDetailsComponent } from './post-page/community-details/community-details.component';


@NgModule({
  declarations: [
    SubtireddPageComponent,
    PostPageComponent,
    CommentsComponent,
    CreateCommentComponent,
    CommentsListComponent,
    SubtireddHeaderComponent,
    AboutCommunityComponent,
    CommunityDetailsComponent
  ],
  imports: [
    CommonModule,
    SubtireddRoutingModule,
    SharedModule,
    MatInputModule,
    FormsModule,
    SharedModule
  ]
})
export class SubtireddModule {
}
