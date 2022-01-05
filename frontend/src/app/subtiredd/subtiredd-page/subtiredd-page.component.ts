import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Observable, Subscription} from "rxjs";
import {Subtiredd} from "../../interfaces/subtiredd";
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";
import {SubtireddService} from "../../services/subtiredd.service";
import {User} from "../../interfaces/user";
import {filter} from "rxjs/operators";

@Component({
  selector: 'trd-subtiredd-page',
  templateUrl: './subtiredd-page.component.html',
  styleUrls: ['./subtiredd-page.component.scss']
})
export class SubtireddPageComponent implements OnDestroy {

  isUserLoggedIn$: Observable<Boolean>;
  user: User;
  userSubscription: Subscription;
  routeSubscription: Subscription;
  subtireddSubscription: Subscription;
  pending: boolean = true;

  subtiredd: Subtiredd;

  subtireddToSubtireddSelectItem(subtiredd: Subtiredd): SubtireddSelectItem {
    return {
      name: subtiredd.name,
      id: subtiredd.id
    }
  }

  constructor(private route: ActivatedRoute, private userService: UserService, private subtireddService: SubtireddService) {
    this.routeSubscription = route.paramMap.subscribe(paramMap => {
      this.subtireddService.getSubtiredd(paramMap.get("subtireddName"))
      this.pending = true;
    });
    this.subtireddSubscription = this.subtireddService.currentSubtiredd$
      .pipe(filter(i => !!i)).subscribe(subtiredd => {
        this.subtiredd = subtiredd;
        this.pending = false;
      })
    this.isUserLoggedIn$ = userService.isUserLoggedIn$;
    this.userSubscription = userService.user$.pipe(filter(u => !!u)).subscribe(user => {
      this.user = user;
    });
  }

  get isUserJoined(): boolean {
    return !!this.user?.subtiredds.find(s => s.id === this.subtiredd.id)
  }

  get isUserAdmin(): boolean {
    return !!this.user?.managedSubtiredds.find(s => s.id === this.subtiredd.id)
  }

  ngOnDestroy(): void {
    this.subtireddService.clearSubtiredd();
    this.userSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.subtireddSubscription.unsubscribe();
  }
}
