import {Component, Input} from '@angular/core';
import {AccountModalService} from "../../services/account-modal.service";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {CommunityMembershipService} from "../../services/community-membership.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'trd-subtiredd-header',
  templateUrl: './subtiredd-header.component.html',
  styleUrls: ['./subtiredd-header.component.scss']
})
export class SubtireddHeaderComponent {

  @Input() subtireddId: number
  @Input() subtireddName: string
  imageUrl = "https://www.countryandtownhouse.co.uk/wp-content/uploads/2017/01/knitting.jpg";
  @Input() hasUserJoined: Boolean = false;
  membershipButtonEnabled: Boolean = true;
  isMouseOver: Boolean = false;
  isUserLoggedIn: Boolean = false
  isUserLoggedInSubscription: Subscription

  constructor(
    private userService: UserService,
    private accountModalService: AccountModalService,
    private communityMembershipService: CommunityMembershipService
  ) {
    this.isUserLoggedInSubscription = userService.isUserLoggedIn$.subscribe(isUserLoggedIn => this.onLoginStatusChanged(isUserLoggedIn))
  }

  onLoginStatusChanged(isUserLoggedIn: boolean) {
    this.isUserLoggedIn = isUserLoggedIn;
    if (!isUserLoggedIn)
      this.hasUserJoined = false
  }

  ngOnDestroy(): void {
    this.isUserLoggedInSubscription.unsubscribe()
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
    this.communityMembershipService.joinCommunity(this.subtireddId)
    this.communityMembershipService.communityJoined$
      .pipe(take(1))
      .subscribe(_ => {
        this.hasUserJoined = true
        this.membershipButtonEnabled = true
        this.isMouseOver = false // prevents glitching when mouseout happens on a disabled button
      })
  }

  leaveCommunity() {
    this.membershipButtonEnabled = false
    this.communityMembershipService.leaveCommunity(this.subtireddId)
    this.communityMembershipService.communityLeft$
      .pipe(take(1))
      .subscribe(_ => {
        this.hasUserJoined = false
        this.membershipButtonEnabled = true
        this.isMouseOver = false // prevents glitching when mouseout happens on a disabled button
      })
  }
}
