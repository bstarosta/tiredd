import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {SubtireddSelectItemsService} from "../../services/subtiredd-select-items.service";

export interface HeaderSubtireddSelectItem {
  url?: string;
  name: string;
  icon?: string;
  onClick?: Function;
}


@Component({
  selector: 'trd-header-subtiredd-select',
  templateUrl: './header-subtiredd-select.component.html',
  styleUrls: ['./header-subtiredd-select.component.scss']
})
export class HeaderSubtireddSelectComponent implements OnInit {

  allSubtireddSelectItems: HeaderSubtireddSelectItem[]
  displayedSubtireddSelectItems: HeaderSubtireddSelectItem[]

  constructor(private router: Router, private subtireddSelectItemsService: SubtireddSelectItemsService) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.selectedSubtireddSelectItem = this.createCurrentSubtireddSelectItem(event.url)
      }
    })
    this.subtireddSelectItemsService.subtireddSelectItems$.subscribe(items => this.allSubtireddSelectItems = items)
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
}
