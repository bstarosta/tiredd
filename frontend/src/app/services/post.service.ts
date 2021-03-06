import {Inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {API_BASE_URL} from "../utils/api-base-url";
import {HttpClient} from "@angular/common/http";
import {CreatePostFormOutput} from "../interfaces/create-post-form-output";
import {Post} from "../interfaces/post";
import {PostListItemInfo} from "../interfaces/post-list-item-info";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly postControllerUrl: string = "api/post"
  private readonly subtireddControllerUrl: string = "api/subtiredd"

  private postCreated: Subject<Post> = new Subject<Post>();
  postCreated$: Observable<Post> = this.postCreated.asObservable();

  private currentPost: BehaviorSubject<PostListItemInfo> = new BehaviorSubject<PostListItemInfo>(null);
  currentPost$: Observable<PostListItemInfo> = this.currentPost.asObservable();

  private notFoundError: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  notFoundError$: Observable<string> = this.notFoundError.asObservable();

  constructor(@Inject(API_BASE_URL) private baseUrl: string, private httpClient: HttpClient) {
  }

  createPost(postData: CreatePostFormOutput): void {
    this.httpClient.post<Post>(this.baseUrl + this.postControllerUrl, postData)
      .subscribe(post => this.postCreated.next(post), error => console.error(error))
  }

  getPost(subtireddName: string, postId: number): void {
    this.httpClient
      .get<PostListItemInfo>(this.baseUrl + this.subtireddControllerUrl + "/" + subtireddName + "/post/" + postId)
      .subscribe(post => this.currentPost.next(post),
        error => {
          if (error.status === 404) {
            this.notFoundError.next(error.error)
          } else
            console.log(error)
        })
  }
}
