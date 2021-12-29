import {Component, Input} from '@angular/core';
import {AccountModalService} from "../../services/account-modal.service";

@Component({
  selector: 'trd-subtiredd-header',
  templateUrl: './subtiredd-header.component.html',
  styleUrls: ['./subtiredd-header.component.scss']
})
export class SubtireddHeaderComponent {

  @Input() subtireddName: string;
  @Input() isUserLoggedIn: Boolean;
  // TODO: get from service
  hasUserJoined: Boolean = false;
  imageUrl = "https://www.countryandtownhouse.co.uk/wp-content/uploads/2017/01/knitting.jpg";
  changeText: Boolean = false;

  constructor(private accountModalService: AccountModalService) {
  }

  onJoinClick() {
    if (this.isUserLoggedIn) {
      if (this.hasUserJoined)
        console.log("Leave")
      else
        console.log("Join")
    } else {
      this.accountModalService.openAccountModal("register");
    }
  }

}
