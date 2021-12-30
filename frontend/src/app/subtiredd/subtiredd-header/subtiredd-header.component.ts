import {Component, Input} from '@angular/core';
import {AccountModalService} from "../../services/account-modal.service";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'trd-subtiredd-header',
  templateUrl: './subtiredd-header.component.html',
  styleUrls: ['./subtiredd-header.component.scss']
})
export class SubtireddHeaderComponent {

  @Input() subtireddName: string;
  imageUrl = "https://www.countryandtownhouse.co.uk/wp-content/uploads/2017/01/knitting.jpg";
  hasUserJoined: Boolean = false;
  isMouseOver: Boolean = false;
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
