import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../../interfaces/comment";
import {UserService} from "../../../services/user.service";
import {Observable} from "rxjs";
import {AccountModalService} from "../../../services/account-modal.service";

@Component({
  selector: 'trd-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  @Input() comments: Comment[]
  showReplyInput: Boolean[]
  isUserLoggedIn$: Observable<Boolean>

  constructor(private userService: UserService, private accountModalService: AccountModalService) {
    this.isUserLoggedIn$ = userService.isUserLoggedIn$
  }

  ngOnInit(): void {
    this.showReplyInput = this.comments.map(() => false)
  }

  onReplyToggle(commentIndex: number) {
    this.isUserLoggedIn$.subscribe(isUserLoggedIn => {
      if (isUserLoggedIn)
        this.showReplyInput[commentIndex] = !this.showReplyInput[commentIndex]
      else
        this.accountModalService.openAccountModal('login')
    })
  }
}
