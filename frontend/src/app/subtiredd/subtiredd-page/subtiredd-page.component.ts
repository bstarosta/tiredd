import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Observable, Subscription} from "rxjs";
import {Subtiredd} from "../../interfaces/subtiredd";

@Component({
  selector: 'trd-subtiredd-page',
  templateUrl: './subtiredd-page.component.html',
  styleUrls: ['./subtiredd-page.component.scss']
})
export class SubtireddPageComponent implements OnDestroy {

  isUserLoggedIn$: Observable<Boolean>;
  routeSubscription: Subscription;

  subtiredd: Subtiredd = {
    id: 1,
    name: null,
    description: "Description",
    imageUrl: "https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg",
    createdAt: new Date("2021-12-18T18:21:00Z"),
    adminId: '1'
  }

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.routeSubscription = route.paramMap.subscribe(paramMap => this.subtiredd.name = paramMap.get("subtireddName"));
    this.isUserLoggedIn$ = userService.isUserLoggedIn$;
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
