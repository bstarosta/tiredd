import {Inject, Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {API_BASE_URL} from "../utils/api-base-url";
import {HttpClient} from "@angular/common/http";
import {CreatePostFormOutput} from "../interfaces/create-post-form-output";
import {Post} from "../interfaces/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly controllerUrl: string = "api/post"

  private postCreated: Subject<Post> = new Subject<Post>();
  postCreated$: Observable<Post> = this.postCreated.asObservable();

  constructor(@Inject(API_BASE_URL) private baseUrl: string, private httpClient: HttpClient) {
  }

  createPost(postData: CreatePostFormOutput): void {
    this.httpClient.post<Post>(this.baseUrl + this.controllerUrl, postData)
      .subscribe(post => this.postCreated.next(post), error => console.error(error))
  }
}
