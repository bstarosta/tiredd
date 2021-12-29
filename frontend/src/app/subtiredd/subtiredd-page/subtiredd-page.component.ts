import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'trd-subtiredd-page',
  templateUrl: './subtiredd-page.component.html',
  styleUrls: ['./subtiredd-page.component.scss']
})
export class SubtireddPageComponent {

  isUserLoggedIn$: Observable<Boolean>;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.subtireddName = route.snapshot.paramMap.get("name");
    this.isUserLoggedIn$ = userService.isUserLoggedIn$;
  }

  subtireddName: string

}
