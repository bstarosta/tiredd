import {Inject, Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {API_BASE_URL} from "../utils/api-base-url";
import {HttpClient} from "@angular/common/http";
import {SubmitVoteOutput} from "../interfaces/submit-vote-output";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private readonly controllerUrl: string = `api/vote`

  private voteSubmitted: Subject<number> = new Subject<number>()
  voteSubmitted$: Observable<number> = this.voteSubmitted.asObservable()

  constructor(@Inject(API_BASE_URL) private baseUrl: string, private httpClient: HttpClient) {
  }

  submitVote(voteData: SubmitVoteOutput) {
    this.httpClient.put<number>(this.baseUrl + this.controllerUrl, voteData)
      .subscribe(_ => this.voteSubmitted.next(voteData.postId))
  }

  deleteVote(postId: number) {
    this.httpClient.delete<number>(this.baseUrl + this.controllerUrl + `?postId=${postId}`)
      .subscribe(_ => this.voteSubmitted.next(postId))
  }
}
