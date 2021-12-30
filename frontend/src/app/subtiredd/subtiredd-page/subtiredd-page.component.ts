import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'trd-subtiredd-page',
  templateUrl: './subtiredd-page.component.html',
  styleUrls: ['./subtiredd-page.component.scss']
})
export class SubtireddPageComponent implements OnDestroy {

  isUserLoggedIn$: Observable<Boolean>;
  routeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.routeSubscription = route.paramMap.subscribe(paramMap => this.subtireddName = paramMap.get("subtireddName"));
    this.isUserLoggedIn$ = userService.isUserLoggedIn$;
  }

  subtireddName: string

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
