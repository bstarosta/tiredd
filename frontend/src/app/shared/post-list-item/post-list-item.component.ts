import {Component, OnInit} from '@angular/core';
import {PostListItemInfo} from "../../interfaces/post-list-item-info";

@Component({
  selector: 'trd-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  postInfo: PostListItemInfo = {
    title: "This is a post",
    subtireddName: "t/subtiredd",
    score: 100,
    userVote: null,
    timestamp: new Date("2021-12-18T18:21:00Z"),
    image: "https://cdn.vox-cdn.com/thumbor/kcwYR08QGJ5Srb-Z_VY8bXp01SI=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/59245045/hangoutsscreen_3.0.jpg",
    // image: null,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
