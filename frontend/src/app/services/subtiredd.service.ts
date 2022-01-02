import {Inject, Injectable} from '@angular/core';
import {API_BASE_URL} from "../utils/api-base-url";
import {Observable, Subject} from "rxjs";
import {CreateCommunityFormOutput} from "../interfaces/create-community-form-output";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubtireddService {

  private readonly controllerUrl: string = "api/subtiredd"

  private subtireddCreated: Subject<void> = new Subject<void>();
  private subtireddNameConflict: Subject<void> = new Subject<void>();
  subtireddCreated$: Observable<void> = this.subtireddCreated.asObservable();
  subtireddNameConflict$: Observable<void> = this.subtireddNameConflict.asObservable();

  constructor(@Inject(API_BASE_URL) private baseUrl: string, private httpClient: HttpClient ) { }

  createSubtiredd(subtireddData: CreateCommunityFormOutput): void {
    this.httpClient.post(this.baseUrl + this.controllerUrl, subtireddData).subscribe( _ => {
      this.subtireddCreated.next()
    }, error => {
      if (error.status === 409) {
        this.subtireddNameConflict.next();
      } else {
        console.log(error)
      }
    })
  }

}
