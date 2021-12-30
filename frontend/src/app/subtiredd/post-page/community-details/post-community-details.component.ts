import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";
import {AccountModalService} from "../../../services/account-modal.service";

@Component({
  selector: 'trd-post-community-details',
  templateUrl: './post-community-details.component.html',
  styleUrls: ['./post-community-details.component.scss']
})
export class PostCommunityDetailsComponent implements OnInit, OnDestroy {

  community = {
    name: 'subtiredd',
    imageUrl: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    numberOfMembers: 1000,
    createDate: new Date("2021-12-18T18:21:00Z")
  }
  hasUserJoined: boolean = false
  isMouseOver: boolean = false
  isUserLoggedIn: Boolean = false
  isUserLoggedInSubscription: Subscription

  constructor(private userService: UserService, private accountModalService: AccountModalService) {
    this.isUserLoggedInSubscription = userService.isUserLoggedIn$.subscribe(isUserLoggedIn => this.onLoginStatusChanged(isUserLoggedIn))
  }

  onLoginStatusChanged(isUserLoggedIn: boolean) {
    this.isUserLoggedIn = isUserLoggedIn;
    if (!isUserLoggedIn)
      this.hasUserJoined = false
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.isUserLoggedInSubscription.unsubscribe()
  }

  onJoinClick(event: Event) {
    event.stopPropagation()
    if (this.isUserLoggedIn) {
      this.hasUserJoined = !this.hasUserJoined
    } else {
      this.accountModalService.openAccountModal('login');
    }
  }
}
