import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'trd-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  isUserLoggedIn$ : Observable<Boolean>

  constructor(private userService: UserService) {
    this.isUserLoggedIn$ = userService.isUserLoggedIn$;
  }
}
