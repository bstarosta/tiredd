import {Injectable} from '@angular/core';
import {PostListItemInfo} from "../interfaces/post-list-item-info";
import {BehaviorSubject, Observable} from "rxjs";
import {PostListOrder} from "../types/post-list-order";

@Injectable({
  providedIn: 'root'
})
export class PostColumnService {

  posts: PostListItemInfo[] = [
    {
      title: "This is a post",
      subtireddName: "t/subtiredd",
      score: 100,
      userVote: null,
      timestamp: new Date("2021-12-18T18:21:00Z"),
      image: "https://cdn.vox-cdn.com/thumbor/kcwYR08QGJ5Srb-Z_VY8bXp01SI=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/59245045/hangoutsscreen_3.0.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      title: "This is another post",
      subtireddName: "t/subtiredd",
      score: 100,
      userVote: null,
      timestamp: new Date("2021-12-01T12:57:00Z"),
      image: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      title: "This is also a post",
      subtireddName: "t/subtiredd",
      score: 100,
      userVote: null,
      timestamp: new Date("2021-11-29T01:48:00Z"),
      image: "https://techcrunch.com/wp-content/uploads/2019/02/Reddit-Header.png?w=1015",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ]

  private postList: BehaviorSubject<PostListItemInfo[]> = new BehaviorSubject<PostListItemInfo[]>(this.posts);
  postList$: Observable<PostListItemInfo[]> = this.postList.asObservable();

  constructor() {
  }

  getPostList(postListOrder: PostListOrder): void {
    this.postList.next(this.posts);
  }

}
