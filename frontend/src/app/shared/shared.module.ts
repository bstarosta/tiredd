import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {LanguagePickerComponent} from "./language-picker/language-picker.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from './header/header.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {SearchbarComponent} from './searchbar/searchbar.component';
import {HeaderSubtireddSelectComponent} from './header-subtiredd-select/header-subtiredd-select.component';
import {UserAvatarComponent} from './user-avatar/user-avatar.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {PostListItemComponent} from './post-list-item/post-list-item.component';
import {PostListComponent} from './post-list/post-list.component';
import {PostListOrderPickerComponent} from './post-list-order-picker/post-list-order-picker.component';
import {PostColumnComponent} from './posts-column/post-column.component';
import {CommunityAvatarComponent} from './community-avatar/community-avatar.component';
import {CreatePostComponent} from './create-post/create-post.component';
import {CreatePostModalComponent} from './create-post-modal/create-post-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {SecurityModule} from "./security/security.module";
import {CreatePostSubtireddSelectComponent} from './create-post-subtiredd-select/create-post-subtiredd-select.component';
import {HeaderUserAvatarComponent} from './header-user-avatar/header-user-avatar.component';
import {MatTabsModule} from "@angular/material/tabs";
import {CreateCommunityModalComponent} from './create-community-modal/create-community-modal.component';
import {CreateCommunityFormComponent} from './create-community-form/create-community-form.component';
import {SuccessSnackbarComponent} from './success-toast/success-snackbar.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {LocalizedDatePipe} from './localized-date.pipe';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [LanguagePickerComponent, HeaderComponent, SearchbarComponent, HeaderSubtireddSelectComponent, UserAvatarComponent, PostListItemComponent, PostListComponent, PostListOrderPickerComponent, PostColumnComponent, CommunityAvatarComponent, CreatePostComponent, CreatePostModalComponent, CreatePostSubtireddSelectComponent, HeaderUserAvatarComponent, LocalizedDatePipe, CreateCommunityModalComponent, CreateCommunityFormComponent, SuccessSnackbarComponent, PageLoaderComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatMenuModule,
        MatIconModule,
        RouterModule,
        MatDialogModule,
        SecurityModule,
        MatTabsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
  exports: [
    LanguagePickerComponent,
    TranslateModule,
    HeaderComponent,
    PostListItemComponent,
    PostListComponent,
    PostListOrderPickerComponent,
    PostColumnComponent,
    CreatePostComponent,
    UserAvatarComponent,
    CommunityAvatarComponent,
    LocalizedDatePipe,
    PageLoaderComponent
  ]
})
export class SharedModule {
}
