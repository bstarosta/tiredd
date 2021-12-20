import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'trd-trending-today',
  templateUrl: './trending-today.component.html',
  styleUrls: ['./trending-today.component.scss']
})
export class TrendingTodayComponent implements OnInit {

  trendingPosts = [
    'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg',
    'https://cdn.theatlantic.com/thumbor/W544GIT4l3z8SG-FMUoaKpFLaxE=/0x131:2555x1568/1600x900/media/img/mt/2017/06/shutterstock_319985324/original.jpg',
    'https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg',
    'https://www.fearfreehappyhomes.com/wp-content/uploads/2020/08/shutterstock_707431309-e1554172878508.jpg'
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
