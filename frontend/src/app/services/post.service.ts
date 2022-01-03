import {Inject, Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {API_BASE_URL} from "../utils/api-base-url";
import {HttpClient} from "@angular/common/http";
import {CreatePostFormOutput} from "../interfaces/create-post-form-output";
import {Post} from "../interfaces/post";
import {PostListItemInfo} from "../interfaces/post-list-item-info";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly controllerUrl: string = "api/post"

  private postCreated: Subject<Post> = new Subject<Post>();
  postCreated$: Observable<Post> = this.postCreated.asObservable();

  private currentPost: Subject<PostListItemInfo> = new Subject<PostListItemInfo>();
  currentPost$: Observable<PostListItemInfo> = this.currentPost.asObservable();

  constructor(@Inject(API_BASE_URL) private baseUrl: string, private httpClient: HttpClient) {
  }

  createPost(postData: CreatePostFormOutput): void {
    this.httpClient.post<Post>(this.baseUrl + this.controllerUrl, postData)
      .subscribe(post => this.postCreated.next(post), error => console.error(error))
  }

  getPost(postId: number): void {
    this.httpClient.get<PostListItemInfo>(this.baseUrl + this.controllerUrl + "/" + postId + "/detailed")
      .subscribe(post => this.currentPost.next(post), error => console.error(error))
  }
}
