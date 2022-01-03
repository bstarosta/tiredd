import {Inject, Injectable} from "@angular/core";
import {Comment} from "../interfaces/comment";
import {BehaviorSubject, Observable} from "rxjs";
import {API_BASE_URL} from "../utils/api-base-url";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostCommentsService {

  private readonly controllerUrl = "api/comments";

  private commentsList: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>(null);
  commentsList$: Observable<Comment[]> = this.commentsList.asObservable();

  constructor(@Inject(API_BASE_URL) private baseUrl: string, private httpClient: HttpClient) {
  }

  getCommentsList(postId: number): void {
    const options = {params: new HttpParams().set('postId', postId)};
    this.httpClient.get<Comment[]>(this.baseUrl + this.controllerUrl, options)
      .subscribe(comments => this.commentsList.next(comments), error => console.error(error));
  }
}
