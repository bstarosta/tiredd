import {Component, Input, OnInit} from '@angular/core';
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'trd-subtiredd-select',
  templateUrl: './subtiredd-select.component.html',
  styleUrls: ['./subtiredd-select.component.scss']
})
export class SubtireddSelectComponent implements OnInit {

  @Input() userSubtireddList: any;

  allSubtireddSelectItems: SubtireddSelectItem[] = [
    {name: "Home", url:"/home"},
    {name: "t/awww", url: "/t/awww"},
    {name: "t/whatswrongwithyourdog", url: "/t/whatswrongwithyourdog"},
    {name: "t/dachschund", url: "/t/dachschund"},
    {name: "t/corgi", url: "/t/corgi"},
    {name: "t/dogs", url: "/t/dogs"},
  ]
  displayedSubtireddSelectItems: SubtireddSelectItem[]

  constructor(private route: ActivatedRoute) {
    route.url.subscribe( url => console.log(url))
  }

  searchFilter: string
  currentLocation: string = "Placeholder";

  onSearchChange(): void {
    this.displayedSubtireddSelectItems = this.allSubtireddSelectItems.filter(
      s => s.name.toLowerCase().includes(this.searchFilter.toLowerCase()));
  }

  onOpen(): void {
    this.searchFilter = null;
    this.displayedSubtireddSelectItems = this.allSubtireddSelectItems;
  }


  ngOnInit(): void {
  }

}
