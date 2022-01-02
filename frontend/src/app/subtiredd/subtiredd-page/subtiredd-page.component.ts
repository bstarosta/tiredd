import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Observable, Subscription} from "rxjs";
import {Subtiredd} from "../../interfaces/subtiredd";
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";
import {SubtireddService} from "../../services/subtiredd.service";

@Component({
  selector: 'trd-subtiredd-page',
  templateUrl: './subtiredd-page.component.html',
  styleUrls: ['./subtiredd-page.component.scss']
})
export class SubtireddPageComponent implements OnDestroy {

  isUserLoggedIn$: Observable<Boolean>;
  routeSubscription: Subscription;
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
      this.pending = true
    });
    this.subtireddService.currentSubtiredd$.subscribe( subtiredd => {
      this.subtiredd = subtiredd;
      this.pending = false;
    })
    this.isUserLoggedIn$ = userService.isUserLoggedIn$;
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
