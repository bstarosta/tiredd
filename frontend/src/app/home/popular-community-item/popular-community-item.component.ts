import {Component, Input, OnInit} from '@angular/core';
import {filter, take} from "rxjs/operators";
import {UserService} from "../../services/user.service";
import {AccountModalService} from "../../services/account-modal.service";
import {CommunityMembershipService} from "../../services/community-membership.service";
import {Subscription} from "rxjs";
import {PopularSubtireddInfo} from "../../interfaces/popular-subtiredd-info";
import {User} from "../../interfaces/user";

@Component({
  selector: 'trd-popular-community-item',
  templateUrl: './popular-community-item.component.html',
  styleUrls: ['./popular-community-item.component.scss']
})
export class PopularCommunityItemComponent implements OnInit {

  @Input() index: number
  @Input() community: PopularSubtireddInfo
  hasUserJoined: Boolean = false
  membershipButtonEnabled: Boolean = true
  isMouseOver: Boolean = false
  isUserLoggedIn: Boolean = false
  isUserLoggedInSubscription: Subscription
  user: User
  userSubscription: Subscription

  constructor(
    private userService: UserService,
    private accountModalService: AccountModalService,
    private communityMembershipService: CommunityMembershipService
  ) {
    this.isUserLoggedInSubscription = userService.isUserLoggedIn$
      .subscribe(isUserLoggedIn => this.onLoginStatusChanged(isUserLoggedIn))
  }

  ngOnInit() {
    this.userSubscription = this.userService.user$.pipe(filter(u => !!u))
      .subscribe(user => {
          this.user = user
          this.hasUserJoined = !!user?.subtiredds.find(s => s.id === this.community.id)
        }
      )
  }

  onLoginStatusChanged(isUserLoggedIn: boolean) {
    this.isUserLoggedIn = isUserLoggedIn;
    if (!isUserLoggedIn)
      this.hasUserJoined = false
  }

  ngOnDestroy(): void {
    this.isUserLoggedInSubscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }

  onMembershipClick(event: Event) {
    event.stopPropagation()
    if (this.isUserLoggedIn)
      this.changeMembership()
    else
      this.accountModalService.openAccountModal('login')
  }

  changeMembership() {
    if (this.hasUserJoined)
      this.leaveCommunity();
    else
      this.joinCommunity();
  }

  joinCommunity() {
    this.membershipButtonEnabled = false
    this.communityMembershipService.joinCommunity(this.community.id)
    this.communityMembershipService.communityJoined$
      .pipe(
        filter(subtiredd => subtiredd.id === this.community.id),
        take(1)
      )
      .subscribe(_ => {
        this.hasUserJoined = true
        this.membershipButtonEnabled = true
        this.isMouseOver = false // prevents glitching when mouseout happens on a disabled button
      })
  }

  leaveCommunity() {
    this.membershipButtonEnabled = false
    this.communityMembershipService.leaveCommunity(this.community.id)
    this.communityMembershipService.communityLeft$
      .pipe(
        filter(subtiredd => subtiredd.id === this.community.id),
        take(1)
      )
      .subscribe(_ => {
        this.hasUserJoined = false
        this.membershipButtonEnabled = true
        this.isMouseOver = false // prevents glitching when mouseout happens on a disabled button
      })
  }
}
