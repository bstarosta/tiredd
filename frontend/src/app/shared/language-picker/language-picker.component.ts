import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Language} from "../../interfaces/language";

@Component({
  selector: 'trd-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent implements OnInit {

  constructor(private translateService: TranslateService) {
  }

  languages: Language[] = [
    {shortName: 'pl', name: 'Polski', flagName: 'pl'},
    {shortName: 'en', name: 'English', flagName: 'gb'}
  ]
  selectedLanguage: Language

  onLanguageChange(): void {
    this.translateService.use(this.selectedLanguage.shortName)
  }

  ngOnInit(): void {
    this.selectedLanguage = this.languages.find(language =>
      language.shortName === this.translateService.currentLang
    )
  }

}
