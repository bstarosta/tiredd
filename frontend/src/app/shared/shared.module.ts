import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {LanguagePickerComponent} from "./language-picker/language-picker.component";
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [LanguagePickerComponent, HeaderComponent,],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [
    LanguagePickerComponent,
    TranslateModule,
    HeaderComponent
  ]
})
export class SharedModule {
}
