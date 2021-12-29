import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'trd-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.scss']
})
export class CommunityDetailsComponent implements OnInit {

  community = {
    name: 'subtiredd',
    imageUrl: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    numberOfMembers: 1000,
    createDate: new Date("2021-12-18T18:21:00Z")
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
