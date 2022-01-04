import {Inject, Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {TrendingPostInfo} from "../interfaces/trending-post-info";
import {API_BASE_URL} from "../utils/api-base-url";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TrendingTodayService {

  private readonly controllerUrl: string = "api/posts/trending-today"

  private trendingToday: Subject<TrendingPostInfo[]> = new Subject<TrendingPostInfo[]>()
  trendingToday$: Observable<TrendingPostInfo[]> = this.trendingToday.asObservable()

  constructor(@Inject(API_BASE_URL) private baseUrl: string, private httpClient: HttpClient) {
  }

  getTrendingToday(): void {
    this.httpClient.get<TrendingPostInfo[]>(this.baseUrl + this.controllerUrl)
      .subscribe(trendingToday => this.trendingToday.next(trendingToday))
  }
}
