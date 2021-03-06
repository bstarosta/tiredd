import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";

@Component({
  selector: 'trd-create-post-subtiredd-select',
  templateUrl: './create-post-subtiredd-select.component.html',
  styleUrls: ['./create-post-subtiredd-select.component.scss']
})
export class CreatePostSubtireddSelectComponent implements OnInit {

  @Input() allSubtireddSelectItems: SubtireddSelectItem[];
  @Input() currentSubtiredd: SubtireddSelectItem;
  @Output() subtireddSelected: EventEmitter<SubtireddSelectItem> = new EventEmitter<SubtireddSelectItem>();

  displayedSubtireddSelectItems: SubtireddSelectItem[]

  constructor() {
  }

  searchFilter: string;
  selectedSubtiredd: SubtireddSelectItem;

  ngOnInit(): void {
    this.selectedSubtiredd = this.currentSubtiredd;
  }

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
}
