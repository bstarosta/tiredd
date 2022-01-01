import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page/home-page.component';
import {SharedModule} from "../shared/shared.module";
import {HomeRoutingModule} from "./home-routing.module";
import {TrendingTodayComponent} from './trending-today/trending-today.component';
import {PopularCommunityItemComponent} from './popular-community-item/popular-community-item.component';
import {PopularCommunitiesComponent} from "./popular-communities/popular-communities.component";

@NgModule({
  declarations: [
    HomePageComponent,
    TrendingTodayComponent,
    PopularCommunitiesComponent,
    PopularCommunityItemComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule {
}
