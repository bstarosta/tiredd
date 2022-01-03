import {Component, Input} from '@angular/core';
import {PostListItemInfo} from "../../interfaces/post-list-item-info";
import {VoteService} from "../../services/vote.service";
import {filter, take} from "rxjs/operators";

@Component({
  selector: 'trd-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent {

  @Input() post: PostListItemInfo;
  @Input() addRoutesToPost = true;
  votingActive = true;

  constructor(private voteService: VoteService) {
  }

  onUpVote(event: Event) {
    event.stopPropagation()
    if (this.votingActive) {
      this.votingActive = false
      if (this.post.userVote === "UpVote")
        this.deleteUpVote();
      else
        this.submitUpVote();
    }
  }

  deleteUpVote() {
    this.voteService.deleteVote(this.post.id)
    this.voteService.voteSubmitted$
      .pipe(
        filter(postId => postId === this.post.id),
        take(1)
      )
      .subscribe(_ => {
        this.post.score -= 1
        this.post.userVote = null
        this.votingActive = true
      })
  }

  submitUpVote() {
    this.voteService.submitVote({
      postId: this.post.id,
      type: "UpVote"
    })
    this.voteService.voteSubmitted$
      .pipe(
        filter(postId => postId === this.post.id),
        take(1)
      )
      .subscribe(_ => {
        const scoreToAdd = this.post.userVote == "DownVote" ? 2 : 1
        this.post.score += scoreToAdd
        this.post.userVote = "UpVote"
        this.votingActive = true
      })
  }

  onDownVote(event: Event) {
    event.stopPropagation()
    if (this.votingActive) {
      this.votingActive = false
      if (this.post.userVote === "DownVote")
        this.deleteDownVote();
      else
        this.submitDownVote();
    }
  }

  deleteDownVote() {
    this.voteService.deleteVote(this.post.id)
    this.voteService.voteSubmitted$
      .pipe(
        filter(postId => postId === this.post.id),
        take(1)
      )
      .subscribe(_ => {
        this.post.score += 1
        this.post.userVote = null
        this.votingActive = true
      })
  }

  submitDownVote() {
    this.voteService.submitVote({
      postId: this.post.id,
      type: "DownVote"
    })
    this.voteService.voteSubmitted$
      .pipe(
        filter(postId => postId === this.post.id),
        take(1)
      )
      .subscribe(_ => {
        const scoreToSubtract = this.post.userVote == "UpVote" ? 2 : 1
        this.post.score -= scoreToSubtract
        this.post.userVote = "DownVote"
        this.votingActive = true
      })
  }
}
