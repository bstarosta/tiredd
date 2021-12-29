import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {SubtireddSelectItemsService} from "../../services/subtiredd-select-items.service";
import {HeaderSubtireddSelectItem} from "../../interfaces/header-subtiredd-select-item";


@Component({
  selector: 'trd-header-subtiredd-select',
  templateUrl: './header-subtiredd-select.component.html',
  styleUrls: ['./header-subtiredd-select.component.scss']
})
export class HeaderSubtireddSelectComponent{

  allSubtireddSelectItems: HeaderSubtireddSelectItem[];
  displayedSubtireddSelectItems: HeaderSubtireddSelectItem[];

  constructor(private router: Router, private subtireddSelectItemsService: SubtireddSelectItemsService) {
    this.selectedSubtireddSelectItem = this.createCurrentSubtireddSelectItem(this.router.url);
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.selectedSubtireddSelectItem = this.createCurrentSubtireddSelectItem(event.url)
      }
    })
    this.subtireddSelectItemsService.subtireddSelectItems$.subscribe(items => this.allSubtireddSelectItems = items)
  }

  searchFilter: string;
  selectedSubtireddSelectItem: HeaderSubtireddSelectItem;

  createCurrentSubtireddSelectItem(url: string): HeaderSubtireddSelectItem {
    if(!url) {
      url ="/home"
    }

    const urlFragments: string[] = url.split("/")
    if(urlFragments[1] === "home")
      return {
        name: "home",
        url: "/home",
        icon: "home"
      }
    else
    {
      return {
        name: "t/" + urlFragments[2],
        url: "/t/" + urlFragments[2]
      }
    }
  }

  onSearchChange(): void {
    this.displayedSubtireddSelectItems = this.allSubtireddSelectItems.filter(
      s => s.name.toLowerCase().includes(this.searchFilter.toLowerCase()));
  }

  onOpen(): void {
    this.searchFilter = null;
    this.displayedSubtireddSelectItems = this.allSubtireddSelectItems;
  }
}
