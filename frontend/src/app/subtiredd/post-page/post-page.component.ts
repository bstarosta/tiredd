import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'trd-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  postId: string

  constructor(private route: ActivatedRoute, private scroller: ViewportScroller) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get("id")
  }

  scrollToComments() {
    this.scroller.scrollToAnchor("comments")
  }
}
