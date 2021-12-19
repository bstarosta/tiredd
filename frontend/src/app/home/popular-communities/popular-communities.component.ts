import {Component, OnInit} from '@angular/core';
import {PopularCommunityInfo} from "../../interfaces/PopularCommunityInfo";

@Component({
  selector: 'trd-popular-communities',
  templateUrl: './popular-communities.component.html',
  styleUrls: ['./popular-communities.component.scss']
})
export class PopularCommunitiesComponent implements OnInit {

  popularCommunities: PopularCommunityInfo[] = [
    {name: "afirst", imageUrl: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"},
    {name: "bsecond", imageUrl: "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg"},
    {name: "cthird", imageUrl: "https://www.shorturl.at/img/shorturl-icon.png"},
    {name: "dfourth", imageUrl: "https://www.shorturl.at/img/shorturl-icon.png"},
    {name: "efifth", imageUrl: "https://www.shorturl.at/img/shorturl-icon.png"},
    {name: "ffdsdfs", imageUrl: "https://www.shorturl.at/img/shorturl-icon.png"},
    {name: "gfdssfd", imageUrl: "https://www.shorturl.at/img/shorturl-icon.png"},
    {name: "hdsfafsd", imageUrl: "https://www.shorturl.at/img/shorturl-icon.png"},
    {name: "jasdffsd", imageUrl: "https://www.shorturl.at/img/shorturl-icon.png"},
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
