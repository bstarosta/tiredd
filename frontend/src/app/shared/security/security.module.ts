import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountModalComponent} from './account-modal/account-modal.component';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {RegisterModalComponent} from './register-modal/register-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AccountModalHeaderComponent } from './account-modal/account-modal-header/account-modal-header.component';
import {TranslateModule} from "@ngx-translate/core";
import { RegisterFormComponent } from './register-form/register-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    AccountModalComponent,
    LoginModalComponent,
    RegisterModalComponent,
    AccountModalHeaderComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SecurityModule { }
