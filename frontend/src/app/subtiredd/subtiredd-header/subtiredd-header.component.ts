import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'trd-subtiredd-header',
  templateUrl: './subtiredd-header.component.html',
  styleUrls: ['./subtiredd-header.component.scss']
})
export class SubtireddHeaderComponent implements OnInit {

  @Input() subtireddName: string;
  imageUrl = "https://www.countryandtownhouse.co.uk/wp-content/uploads/2017/01/knitting.jpg";

  constructor() {
  }

  ngOnInit(): void {
  }

}
