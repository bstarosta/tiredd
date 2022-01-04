import {Inject, Injectable} from "@angular/core";
import {API_BASE_URL} from "../utils/api-base-url";
import {HttpClient} from "@angular/common/http";
import {PopularSubtireddInfo} from "../interfaces/popular-subtiredd-info";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopularCommunitiesService {

  private readonly controllerUrl: string = "api/subtiredds/popular"

  private popularSubtiredds: Subject<PopularSubtireddInfo[]> = new Subject<PopularSubtireddInfo[]>()
  popularSubtiredds$: Observable<PopularSubtireddInfo[]> = this.popularSubtiredds.asObservable()

  constructor(@Inject(API_BASE_URL) private baseUrl: string, private httpClient: HttpClient) {
  }

  getPopularCommunities(): void {
    this.httpClient.get<PopularSubtireddInfo[]>(this.baseUrl + this.controllerUrl)
      .subscribe(popularSubtiredds => this.popularSubtiredds.next(popularSubtiredds))
  }
}
