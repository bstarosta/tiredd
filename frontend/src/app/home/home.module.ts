import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import {SharedModule} from "../shared/shared.module";
import {HomeRoutingModule} from "./home-routing.module";
import { TrendingTodayComponent } from './trending-today/trending-today.component';



@NgModule({
  declarations: [
    HomePageComponent,
    TrendingTodayComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
