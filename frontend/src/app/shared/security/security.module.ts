import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountModalComponent} from './account-modal/account-modal.component';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {RegisterModalComponent} from './register-modal/register-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AccountModalHeaderComponent } from './account-modal/account-modal-header/account-modal-header.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    AccountModalComponent,
    LoginModalComponent,
    RegisterModalComponent,
    AccountModalHeaderComponent
  ],
    imports: [
        CommonModule,
        MatDialogModule,
        TranslateModule
    ]
})
export class SecurityModule { }
