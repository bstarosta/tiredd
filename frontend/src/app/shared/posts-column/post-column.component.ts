import {Component} from '@angular/core';
import {PostColumnService} from "../../services/post-column.service";
import {Observable} from "rxjs";
import {PostListItemInfo} from "../../interfaces/post-list-item-info";
import {PostListOrder} from "../../types/post-list-order";

const DEFAULT_ORDER: PostListOrder = "hot";

@Component({
  selector: 'trd-posts-column',
  templateUrl: './post-column.component.html',
  styleUrls: ['./post-column.component.scss']
})
export class PostColumnComponent {

  selectedOrder: PostListOrder = DEFAULT_ORDER;
  postList$: Observable<PostListItemInfo[]>;

  constructor(private postColumnService: PostColumnService) {
    postColumnService.getPostList(this.selectedOrder);
    this.postList$ = postColumnService.postList$;
  }

  onOrderPicked(postListOrder: PostListOrder) {
    this.postColumnService.getPostList(postListOrder);
    this.selectedOrder = postListOrder;
  }

}
