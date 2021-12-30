import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "./services/user.service";
import localePl from '@angular/common/locales/pl';
import {registerLocaleData} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private translateService: TranslateService, private userService: UserService) {
    translateService.addLangs(['en', 'pl']);
    translateService.setDefaultLang('en');
    translateService.use('pl');
  }


  ngOnInit(): void {
    this.userService.getUserData();
    registerLocaleData(localePl, "pl");
  }
}
