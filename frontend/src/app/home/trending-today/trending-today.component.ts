import {Component, OnDestroy} from '@angular/core';
import {TrendingPostInfo} from "../../interfaces/trending-post-info";
import {TrendingTodayService} from "../../services/trending-today.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'trd-trending-today',
  templateUrl: './trending-today.component.html',
  styleUrls: ['./trending-today.component.scss']
})
export class TrendingTodayComponent implements OnDestroy{

  trendingToday: TrendingPostInfo[]
  trendingTodaySubscription: Subscription

  constructor(private trendingTodayService: TrendingTodayService) {
    this.trendingTodayService.getTrendingToday()
    this.trendingTodaySubscription = this.trendingTodayService.trendingToday$
      .subscribe(trendingToday => this.trendingToday = trendingToday)
  }

  ngOnDestroy(): void {
    this.trendingTodaySubscription.unsubscribe()
  }
}
