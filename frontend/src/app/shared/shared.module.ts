import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {LanguagePickerComponent} from "./language-picker/language-picker.component";
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { SearchbarComponent } from './searchbar/searchbar.component';


@NgModule({
  declarations: [LanguagePickerComponent, HeaderComponent, SearchbarComponent,],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  exports: [
    LanguagePickerComponent,
    TranslateModule,
    HeaderComponent
  ]
})
export class SharedModule {
}
