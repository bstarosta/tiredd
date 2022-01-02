import {Component, Input} from '@angular/core';
import {PostListItemInfo} from "../../interfaces/post-list-item-info";

@Component({
  selector: 'trd-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent {

  @Input() post: PostListItemInfo;
  @Input() addRoutesToPost = true;

}
