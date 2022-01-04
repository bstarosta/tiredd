import {Component, OnDestroy} from '@angular/core';
import {PopularCommunitiesService} from "../../services/popular-communities.service";
import {PopularSubtireddInfo} from "../../interfaces/popular-subtiredd-info";
import {Subscription} from "rxjs";

@Component({
  selector: 'trd-popular-communities',
  templateUrl: './popular-communities.component.html',
  styleUrls: ['./popular-communities.component.scss']
})
export class PopularCommunitiesComponent implements OnDestroy {

  popularCommunities: PopularSubtireddInfo[]
  popularCommunitiesSubscription: Subscription

  constructor(private popularCommunitiesService: PopularCommunitiesService) {
    this.popularCommunitiesService.getPopularCommunities()
    this.popularCommunitiesSubscription = this.popularCommunitiesService.popularSubtiredds$
      .subscribe(popularSubtiredds => this.popularCommunities = popularSubtiredds)
  }

  ngOnDestroy(): void {
    this.popularCommunitiesSubscription.unsubscribe()
  }
}
