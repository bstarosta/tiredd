import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";
import {ActivatedRoute} from "@angular/router";

const DEFAULT_SELECTED_SUBTIREDD: SubtireddSelectItem = {name: "Home", url: "/home"};

@Component({
  selector: 'trd-subtiredd-select',
  templateUrl: './subtiredd-select.component.html',
  styleUrls: ['./subtiredd-select.component.scss']
})
export class SubtireddSelectComponent implements OnInit {

  @Input() allSubtireddSelectItems: SubtireddSelectItem[];
  @Output() subtireddSelected: EventEmitter<SubtireddSelectItem> = new EventEmitter<SubtireddSelectItem>();

  displayedSubtireddSelectItems: SubtireddSelectItem[]

  constructor(private route: ActivatedRoute) {
    route.url.subscribe(url => console.log(url))
  }

  searchFilter: string;
  selectedSubtiredd?: SubtireddSelectItem = DEFAULT_SELECTED_SUBTIREDD;

  onSearchChange(): void {
    this.displayedSubtireddSelectItems = this.allSubtireddSelectItems.filter(
      s => s.name.toLowerCase().includes(this.searchFilter.toLowerCase()));
  }

  onOpen(): void {
    this.searchFilter = null;
    this.displayedSubtireddSelectItems = this.allSubtireddSelectItems;
  }

  onSubtireddSelected(selectedSubtiredd: SubtireddSelectItem) {
    this.selectedSubtiredd = selectedSubtiredd;
    this.subtireddSelected.emit(selectedSubtiredd);
  }

  ngOnInit(): void {
  }

}
