import { Component, OnInit } from '@angular/core';
import {PopularCommunityInfo} from "../../../interfaces/popular-community-info";

@Component({
  selector: 'trd-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.scss']
})
export class CommunityDetailsComponent implements OnInit {

  popularCommunities: PopularCommunityInfo[] = [
    {name: "first", imageUrl: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"},
    {name: "second", imageUrl: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg"},
    {name: "third", imageUrl: "https://www.shorturl.at/img/shorturl-icon.png"},
    {name: "fourth", imageUrl: "https://www.shorturl.at/img/shorturl-icon.png"},
    {name: "fifth", imageUrl: "https://www.shorturl.at/img/shorturl-icon.png"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
