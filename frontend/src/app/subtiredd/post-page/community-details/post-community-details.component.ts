import {Component, Input, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";
import {AccountModalService} from "../../../services/account-modal.service";
import {Subtiredd} from "../../../interfaces/subtiredd";
import {filter, take} from "rxjs/operators";
import {CommunityMembershipService} from "../../../services/community-membership.service";

@Component({
  selector: 'trd-post-community-details',
  templateUrl: './post-community-details.component.html',
  styleUrls: ['./post-community-details.component.scss']
})
export class PostCommunityDetailsComponent implements OnDestroy {

  @Input() community: Subtiredd;
  isMouseOver: boolean = false;
  hasUserJoined: Boolean;
  isUserAdmin: Boolean = false;
  userSubscription: Subscription;
  isUserLoggedIn: Boolean = false;
  isUserLoggedInSubscription: Subscription;
  membershipButtonEnabled: Boolean = true;

  constructor(
    private userService: UserService,
    private accountModalService: AccountModalService,
    private communityMembershipService: CommunityMembershipService
  ) {
    this.isUserLoggedInSubscription = userService.isUserLoggedIn$
      .subscribe(isUserLoggedIn => this.onLoginStatusChanged(isUserLoggedIn));
    this.userSubscription = userService.user$.pipe(filter(u => !!u))
      .subscribe(user => {
        this.hasUserJoined = !!user?.managedSubtiredds.find(s => s.id === this.community.id);
        this.isUserAdmin = !!user?.managedSubtiredds.find(s => s.id === this.community.id);
      });
  }

  onLoginStatusChanged(isUserLoggedIn: boolean) {
    this.isUserLoggedIn = isUserLoggedIn;
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
    this.communityMembershipService.joinCommunity(this.community.id)
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
    this.communityMembershipService.leaveCommunity(this.community.id)
    this.communityMembershipService.communityLeft$
      .pipe(take(1))
      .subscribe(_ => {
        this.hasUserJoined = false
        this.membershipButtonEnabled = true
        this.isMouseOver = false // prevents glitching when mouseout happens on a disabled button
      })
  }
}
