import {Component, Input, OnInit} from '@angular/core';
import {PostColumnService} from "../../services/post-column.service";
import {PostListItemInfo} from "../../interfaces/post-list-item-info";
import {PostListOrder} from "../../types/post-list-order";
import {filter} from "rxjs/operators";

const DEFAULT_ORDER: PostListOrder = "hot";

@Component({
  selector: 'trd-posts-column',
  templateUrl: './post-column.component.html',
  styleUrls: ['./post-column.component.scss']
})
export class PostColumnComponent implements OnInit {

  selectedOrder: PostListOrder = DEFAULT_ORDER;
  postList: PostListItemInfo[] = [];
  postListEndReached: boolean = false;
  loadingPosts: boolean = true;
  pageNumber: number = 1;
  @Input() subtireddId: number;

  constructor(private postColumnService: PostColumnService) {

    postColumnService.clearPostList();
    postColumnService.postList$.pipe(filter(posts => posts !== null && posts !== undefined))
      .subscribe(posts => {
        this.loadingPosts = false;
        this.postList = [...this.postList, ...posts];
        if (posts.length === 0) {
          this.postListEndReached = true;
        }
      })
  }

  onScroll() {
    this.loadMorePosts();
  }

  onOrderPicked(postListOrder: PostListOrder) {
    this.loadingPosts = true;
    this.postList = [];
    this.pageNumber = 1;
    this.postColumnService.getPostList(postListOrder, this.pageNumber, this.subtireddId);
    this.selectedOrder = postListOrder;
    this.postListEndReached = false;
  }

  ngOnInit(): void {
    this.loadPosts()
  }

  loadMorePosts(): void {
    if (!this.postListEndReached) {
      this.pageNumber = this.pageNumber + 1;
      this.loadingPosts = true;
      this.postColumnService.getPostList(this.selectedOrder, this.pageNumber, this.subtireddId);
    }
  }

  loadPosts(): void {
    this.postColumnService.getPostList(this.selectedOrder, this.pageNumber, this.subtireddId);
    this.loadingPosts = true;
  }

}
