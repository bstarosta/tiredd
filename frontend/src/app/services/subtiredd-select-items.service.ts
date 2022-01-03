import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {filter, withLatestFrom} from "rxjs/operators";
import {HeaderSubtireddSelectItem} from "../interfaces/header-subtiredd-select-item";
import {CreateCommunityModalService} from "./create-community-modal.service";
import {UserSubtireddInfo} from "../interfaces/user-subtiredd-info";

@Injectable({
  providedIn: 'root'
})
export class SubtireddSelectItemsService {

  constructor(private userService: UserService, private router: Router, private translateService: TranslateService,
              private createCommunityModalService: CreateCommunityModalService)
  {
    userService.user$.pipe(filter(user => !!user)).subscribe(user => this.createNewSubtireddList(user.subtiredds));
    translateService.onLangChange.pipe(withLatestFrom(userService.user$)).subscribe(([_, user]) => {
      this.createNewSubtireddList(user.subtiredds);
    })
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

  createNewSubtireddList(userSubtiredds: UserSubtireddInfo[]): void {
    this.subtireddSelectItems
      .next([...this.addDefaultItems(), ...this.userSubtireddInfosToHeaderSubtireddSelectItem(userSubtiredds)])
  }

  userSubtireddInfosToHeaderSubtireddSelectItem(userSubtireddInfo: UserSubtireddInfo[]): HeaderSubtireddSelectItem[] {
    return userSubtireddInfo.map((usi) => ({
      name: "t/" + usi.name,
      url: "/t/" + usi.name,
      onClick: this.navigateToUrl
    }))
  }

  openCreateCommunityModal = (): void => {
    this.createCommunityModalService.openCreateCommunityModal();
  }

  navigateToUrl = (url: string): void => {
    this.router.navigate([url])
  }

}
