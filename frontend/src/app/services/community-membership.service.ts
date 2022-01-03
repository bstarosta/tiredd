import {Inject, Injectable} from "@angular/core";
import {API_BASE_URL} from "../utils/api-base-url";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {UserSubtireddInfo} from "../interfaces/user-subtiredd-info";

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

  private communityJoined: Subject<UserSubtireddInfo> = new Subject<UserSubtireddInfo>();
  communityJoined$: Observable<UserSubtireddInfo> = this.communityJoined.asObservable();

  private communityLeft: Subject<UserSubtireddInfo> = new Subject<UserSubtireddInfo>();
  communityLeft$: Observable<UserSubtireddInfo> = this.communityLeft.asObservable();

  constructor(@Inject(API_BASE_URL) private baseUrl: string, private httpClient: HttpClient) {
  }

  joinCommunity(subtireddId: number): void {
    this.httpClient.post<UserSubtireddInfo>(this.baseUrl + CommunityMembershipService.joinControllerUrl(subtireddId), null)
      .subscribe(subtiredd => this.communityJoined.next(subtiredd));
  }

  leaveCommunity(subtireddId: number): void {
    this.httpClient.post<UserSubtireddInfo>(this.baseUrl + CommunityMembershipService.leaveControllerUrl(subtireddId), null)
      .subscribe(subtiredd => this.communityLeft.next(subtiredd));
  }
}
