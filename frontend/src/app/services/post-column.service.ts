import {Inject, Injectable} from '@angular/core';
import {PostListItemInfo} from "../interfaces/post-list-item-info";
import {BehaviorSubject, Observable} from "rxjs";
import {PostListOrder} from "../types/post-list-order";
import {API_BASE_URL} from "../utils/api-base-url";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostColumnService {

  constructor(@Inject(API_BASE_URL) private baseUrl: string, private httpClient: HttpClient) {
  }

  private postList: BehaviorSubject<PostListItemInfo[]> = new BehaviorSubject<PostListItemInfo[]>(null);
  postList$: Observable<PostListItemInfo[]> = this.postList.asObservable();


  getPostList(sorting: PostListOrder, pageNumber: number, subtireddId?: number) {
    let params = new HttpParams().set('pageNumber', pageNumber);
    if(subtireddId) {
      params = params.set('subtireddId', subtireddId)
    }

    this.httpClient.get<PostListItemInfo[]>(this.baseUrl + `api/posts/${sorting}`,
      {params: params}).subscribe(posts => {
        this.postList.next(posts);
    })
  }

  clearPostList() {
    this.postList.next(null)
  }

}
