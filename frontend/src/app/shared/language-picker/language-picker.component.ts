import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'trd-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent implements OnInit {

  constructor(private translateService: TranslateService) { }

  currentLanguage: string;

  onLanguageChange(): void {
    this.translateService.use(this.currentLanguage)
  }

  ngOnInit(): void {
    this.currentLanguage = this.translateService.currentLang
  }

}
