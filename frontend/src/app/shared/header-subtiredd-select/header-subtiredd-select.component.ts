import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";

export interface HeaderSubtireddSelectItem {
  url?: string;
  name: string;
  icon?: string;
  onClick?: Function;
}



const  subtireddSelectItems: HeaderSubtireddSelectItem[] = [
  {name: "home", url: "/home", icon: "home"},
  {name: "createCommunity", icon: "add" },
  {name: "t/awww", url: "/t/awww"},
  {name: "t/whatswrongwithyourdog", url: "/t/whatswrongwithyourdog"},
  {name: "t/dachschund", url: "/t/dachschund"},
  {name: "t/corgi", url: "/t/corgi"},
  {name: "t/dogs", url: "/t/dogs"},
]


@Component({
  selector: 'trd-header-subtiredd-select',
  templateUrl: './header-subtiredd-select.component.html',
  styleUrls: ['./header-subtiredd-select.component.scss']
})
export class HeaderSubtireddSelectComponent implements OnInit {

  allSubtireddSelectItems: HeaderSubtireddSelectItem[] = subtireddSelectItems;
  @Output() subtireddSelected: EventEmitter<SubtireddSelectItem> = new EventEmitter<SubtireddSelectItem>();

  displayedSubtireddSelectItems: HeaderSubtireddSelectItem[]

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.selectedSubtireddSelectItem = this.createCurrentSubtireddSelectItem(event.url)
      }
    })
  }

  createCurrentSubtireddSelectItem(url: string): HeaderSubtireddSelectItem {
    return {
      name: url.substr(1),
      url: url,
      icon: url === "/home" ? "home" : null
    }
  }

  searchFilter: string;
  selectedSubtireddSelectItem: HeaderSubtireddSelectItem;

  ngOnInit(): void {
    this.selectedSubtireddSelectItem = this.allSubtireddSelectItems[0];
  }

  onSearchChange(): void {
    this.displayedSubtireddSelectItems = this.allSubtireddSelectItems.filter(
      s => s.name.toLowerCase().includes(this.searchFilter.toLowerCase()));
  }

  onOpen(): void {
    this.searchFilter = null;
    this.displayedSubtireddSelectItems = this.allSubtireddSelectItems;
  }

  onSubtireddSelected(selectedSubtiredd: HeaderSubtireddSelectItem) {
    this.selectedSubtireddSelectItem = selectedSubtiredd;
    this.subtireddSelected.emit(selectedSubtiredd);
  }

}
