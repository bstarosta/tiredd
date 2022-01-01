import {Inject, Injectable} from "@angular/core";
import {API_BASE_URL} from "../utils/api-base-url";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunityMembershipService {

  private static joinControllerUrl(subtireddId: number) {
    return `api/subtiredd/${subtireddId}/join`
  }

  private static leaveControllerUrl(subtireddId: number) {
    return `api/subtiredd/${subtireddId}/leave`
  }

  private communityJoined: Subject<void> = new Subject<void>();
  communityJoined$: Observable<void> = this.communityJoined.asObservable();

  private communityLeft: Subject<void> = new Subject<void>();
  communityLeft$: Observable<void> = this.communityLeft.asObservable();

  constructor(@Inject(API_BASE_URL) private baseUrl: string, private httpClient: HttpClient) {
  }

  joinCommunity(subtireddId: number): void {
    this.httpClient.post(this.baseUrl + CommunityMembershipService.joinControllerUrl(subtireddId), null)
      .subscribe(_ => this.communityJoined.next())
  }

  leaveCommunity(subtireddId: number): void {
    this.httpClient.post(this.baseUrl + CommunityMembershipService.leaveControllerUrl(subtireddId), null)
      .subscribe(_ => this.communityLeft.next())
  }
}
