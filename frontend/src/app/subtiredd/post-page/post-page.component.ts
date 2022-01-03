import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {PostListItemInfo} from "../../interfaces/post-list-item-info";
import {PostService} from "../../services/post.service";
import {Observable, Subscription} from "rxjs";
import {combineLatest, filter, merge} from "rxjs/operators";
import {PostCommentsService} from "../../services/post-comments.service";
import {Comment} from "../../interfaces/comment";

@Component({
  selector: 'trd-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements AfterViewInit, OnDestroy {

  currentPost$: Observable<PostListItemInfo>;
  notFoundError$: Observable<string>;
  commentsList$: Observable<Comment[]>;
  postPageData$: Observable<any>;
  pending: Boolean = true;
  postServiceSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private scroller: ViewportScroller,
              private postService: PostService,
              private postCommentsService: PostCommentsService) {
    scroller.setOffset([0, 128]);
    let subtireddName = route.snapshot.paramMap.get("subtireddName");
    let postId = +route.snapshot.paramMap.get("postId");

    postService.getPost(subtireddName, postId);
    this.currentPost$ = postService.currentPost$.pipe(filter(i => !!i));
    this.notFoundError$ = postService.notFoundError$;

    postCommentsService.getCommentsList(postId);
    this.commentsList$ = postCommentsService.commentsList$.pipe(filter(i => !!i));

    this.postPageData$ = this.currentPost$.pipe(combineLatest(this.commentsList$));
    this.postServiceSubscription = this.postPageData$
      .pipe(merge(postService.notFoundError$), filter(i => !!i))
      .subscribe(_ => this.pending = false);
  }

  ngAfterViewInit(): void {
    const scrollToComments = this.route.snapshot.fragment === "comments";
    if (scrollToComments)
      this.scroller.scrollToAnchor("comments");
    else
      this.scroller.scrollToPosition([0, 0]);
  }

  ngOnDestroy(): void {
    this.postServiceSubscription.unsubscribe();
  }
}
