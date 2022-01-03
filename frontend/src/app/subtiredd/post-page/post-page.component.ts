import {AfterViewInit, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {PostListItemInfo} from "../../interfaces/post-list-item-info";
import {PostService} from "../../services/post.service";
import {Observable} from "rxjs";

@Component({
  selector: 'trd-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements AfterViewInit {

  currentPost$: Observable<PostListItemInfo>;

  constructor(private route: ActivatedRoute, private scroller: ViewportScroller, private postService: PostService) {
    scroller.setOffset([0, 128]);
    let subtireddName = route.snapshot.paramMap.get("subtireddName");
    let postId = +route.snapshot.paramMap.get("postId");
    postService.getPost(subtireddName, postId);
    this.currentPost$ = postService.currentPost$;
  }

  ngAfterViewInit(): void {
    const scrollToComments = this.route.snapshot.fragment === "comments"
    if (scrollToComments)
      this.scroller.scrollToAnchor("comments")
    else
      this.scroller.scrollToPosition([0, 0])
  }
}
