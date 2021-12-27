import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private translateService: TranslateService, private userService: UserService) {
    translateService.addLangs(['en', 'pl']);
    translateService.setDefaultLang('en');
    translateService.use('pl');
  }


  ngOnInit(): void {
    this.userService.getUserData();
  }
}
