import {Component, OnInit} from '@angular/core';
import {TrendingPost} from "../../interfaces/trending-post";

@Component({
  selector: 'trd-trending-today',
  templateUrl: './trending-today.component.html',
  styleUrls: ['./trending-today.component.scss']
})
export class TrendingTodayComponent implements OnInit {

  trendingPosts: TrendingPost[] = [
    {
      id: '1',
      subtirred: 'subtirred1',
      title: 'Post 1',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur',
      imageUrl: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg'
    },
    {
      id: '2',
      subtirred: 'subtirred2',
      title: 'Post 2',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur',
      imageUrl: 'https://cdn.theatlantic.com/thumbor/W544GIT4l3z8SG-FMUoaKpFLaxE=/0x131:2555x1568/1600x900/media/img/mt/2017/06/shutterstock_319985324/original.jpg'
    },
    {
      id: '3',
      subtirred: 'subtirred3',
      title: 'Post 3',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur',
      imageUrl: 'https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg'
    },
    {
      id: '4',
      subtirred: 'subtirred4',
      title: 'Post 4',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur',
      imageUrl: null
    },
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
