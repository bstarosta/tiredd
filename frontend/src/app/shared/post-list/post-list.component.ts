import {Component, Input} from '@angular/core';
import {PostListItemInfo} from "../../interfaces/post-list-item-info";

@Component({
  selector: 'trd-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  @Input() posts: PostListItemInfo[];

}
