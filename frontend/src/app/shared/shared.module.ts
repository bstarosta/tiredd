import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {LanguagePickerComponent} from "./language-picker/language-picker.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [LanguagePickerComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  exports: [
    LanguagePickerComponent,
    TranslateModule
  ]
})
export class SharedModule {
}
