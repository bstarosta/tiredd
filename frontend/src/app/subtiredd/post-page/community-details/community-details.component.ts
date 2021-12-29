import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'trd-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.scss']
})
export class CommunityDetailsComponent implements OnInit {

  community = {
    name: 'test',
    imageUrl: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
