import {AfterViewInit, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {PostListItemInfo} from "../../interfaces/post-list-item-info";

@Component({
  selector: 'trd-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements AfterViewInit {

  post: PostListItemInfo = {
    id: 1,
    title: "This is a post",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imageUrl: "https://cdn.vox-cdn.com/thumbor/kcwYR08QGJ5Srb-Z_VY8bXp01SI=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/59245045/hangoutsscreen_3.0.jpg",
    score: 100,
    createdAt: new Date("2021-12-18T18:21:00Z"),
    subtireddId: 1,
    authorId: "1",
    subtireddName: "subtiredd",
    authorName: 'author1',
    userVote: null,
  }

  constructor(private route: ActivatedRoute, private scroller: ViewportScroller) {
    scroller.setOffset([0, 128])
  }

  ngAfterViewInit(): void {
    const scrollToComments = this.route.snapshot.fragment === "comments"
    if (scrollToComments)
      this.scroller.scrollToAnchor("comments")
    else
      this.scroller.scrollToPosition([0, 0])
  }
}
