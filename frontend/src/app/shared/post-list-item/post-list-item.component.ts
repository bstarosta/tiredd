import {Component, Input, OnInit} from '@angular/core';
import {PostListItemInfo} from "../../interfaces/post-list-item-info";

@Component({
  selector: 'trd-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() post?: PostListItemInfo;
  @Input() addRoutesToPost = true;

  constructor() {
  }

  ngOnInit(): void {
  }
}
