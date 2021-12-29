import {Component} from '@angular/core';

@Component({
  selector: 'trd-about-community',
  templateUrl: './about-community.component.html',
  styleUrls: ['./about-community.component.scss']
})
export class AboutCommunityComponent {

  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  numberOfMembers = 1000;
  createDate = new Date("2021-12-18T18:21:00Z");

}
