import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {merge} from "rxjs/operators";
import {HeaderSubtireddSelectItem} from "../interfaces/header-subtiredd-select-item";
import {CreateCommunityModalService} from "./create-community-modal.service";

@Injectable({
  providedIn: 'root'
})
export class SubtireddSelectItemsService {

  constructor(private userService: UserService, private router: Router, private translateService: TranslateService,
              private createCommunityModalService: CreateCommunityModalService)
  {
    userService.user$.pipe(merge(translateService.onLangChange)).subscribe(_ => this.createNewSubtireddList());
  }

  private subtireddSelectItems: BehaviorSubject<HeaderSubtireddSelectItem[]> = new BehaviorSubject<HeaderSubtireddSelectItem[]>([]);
  subtireddSelectItems$: Observable<HeaderSubtireddSelectItem[]> = this.subtireddSelectItems.asObservable();

  addDefaultItems(): HeaderSubtireddSelectItem[] {
    const homeItem: HeaderSubtireddSelectItem = {
      name: this.translateService.instant("home"), url: "/home", icon: "home", onClick: this.navigateToUrl
    }
    const createCommunityItem: HeaderSubtireddSelectItem = {
      name: this.translateService.instant("createCommunity"), icon: "add", onClick: this.openCreateCommunityModal
    }
    return [homeItem, createCommunityItem]
  }

  createNewSubtireddList(): void {
    this.subtireddSelectItems
      .next([...this.addDefaultItems(), ...this.mockSubtireddSelectItems])
  }

  openCreateCommunityModal = (): void => {
    this.createCommunityModalService.openCreateCommunityModal();
  }

  navigateToUrl = (url: string): void => {
    this.router.navigate([url])
  }

  mockSubtireddSelectItems: HeaderSubtireddSelectItem[] = [
    {name: "t/awww", url: "/t/awww", onClick: this.navigateToUrl},
    {name: "t/whatswrongwithyourdog", url: "/t/whatswrongwithyourdog", onClick: this.navigateToUrl},
    {name: "t/dachschund", url: "/t/dachschund", onClick: this.navigateToUrl},
    {name: "t/corgi", url: "/t/corgi", onClick: this.navigateToUrl},
    {name: "t/dogs", url: "/t/dogs", onClick: this.navigateToUrl},
  ]

}
