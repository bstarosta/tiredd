import {Inject, Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {CreateComment} from "../interfaces/create-comment";
import {API_BASE_URL} from "../utils/api-base-url";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly controllerUrl: string = "api/comments";

  private commentCreated: Subject<CreateComment> = new Subject<CreateComment>();
  commentCreated$: Observable<CreateComment> = this.commentCreated.asObservable();

  constructor(@Inject(API_BASE_URL) private baseUrl: string, private httpClient: HttpClient) {
  }

  createComment(commentData: CreateComment) {
    this.httpClient.post<CreateComment>(this.baseUrl + this.controllerUrl, commentData)
      .subscribe(comment => this.commentCreated.next(comment), error => console.error(error));
  }
}
