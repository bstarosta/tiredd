import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {LanguagePickerComponent} from "./language-picker/language-picker.component";
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SubtireddSelectComponent } from './subtiredd-select/subtiredd-select.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import { PostListItemComponent } from './post-list-item/post-list-item.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostListOrderPickerComponent } from './post-list-order-picker/post-list-order-picker.component';
import { PostColumnComponent } from './posts-column/post-column.component';


@NgModule({
  declarations: [LanguagePickerComponent, HeaderComponent, SearchbarComponent, SubtireddSelectComponent, UserAvatarComponent, PostListItemComponent, PostListComponent, PostListOrderPickerComponent, PostColumnComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    LanguagePickerComponent,
    TranslateModule,
    HeaderComponent,
    PostListItemComponent,
    PostListComponent,
    PostListOrderPickerComponent,
    PostColumnComponent
  ]
})
export class SharedModule {
}
