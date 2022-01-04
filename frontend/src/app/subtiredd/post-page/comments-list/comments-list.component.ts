import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Comment} from "../../../interfaces/comment";
import {UserService} from "../../../services/user.service";
import {Subscription} from "rxjs";
import {AccountModalService} from "../../../services/account-modal.service";

@Component({
  selector: 'trd-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit, OnDestroy { // TODO: Split this list into components

  @Input() comments: Comment[]
  @Input() postId: number;
  @Output() commentCreated: EventEmitter<Comment> = new EventEmitter<Comment>();
  showReplyInput: Boolean[]
  isUserLoggedIn: Boolean = false
  isUserLoggedInSubscription: Subscription

  constructor(private userService: UserService, private accountModalService: AccountModalService) {
    this.isUserLoggedInSubscription = userService.isUserLoggedIn$.subscribe(isUserLoggedIn => this.onLoginStatusChanged(isUserLoggedIn))
  }

  onLoginStatusChanged(isUserLoggedIn: boolean) {
    this.isUserLoggedIn = isUserLoggedIn;
    if (!isUserLoggedIn)
      this.hideAllReplies();
  }

  hideAllReplies() {
    this.showReplyInput = this.showReplyInput?.map(_ => false)
  }

  ngOnInit(): void {
    this.showReplyInput = this.comments.map(() => false)
  }

  ngOnDestroy(): void {
    this.isUserLoggedInSubscription.unsubscribe()
  }

  onReplyToggle(commentIndex: number) {
    if (this.isUserLoggedIn)
      this.showReplyInput[commentIndex] = !this.showReplyInput[commentIndex]
    else
      this.accountModalService.openAccountModal('login')
  }

  onCommentCreated(comment: Comment) {
    this.commentCreated.emit(comment);
  }
}
