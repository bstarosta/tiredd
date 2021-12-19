import {Component, OnInit} from '@angular/core';
import {PostListOrder} from "../../types/post-list-order";

const DEFAULT_ORDER :PostListOrder = "hot";

@Component({
  selector: 'trd-post-list-order-picker',
  templateUrl: './post-list-order-picker.component.html',
  styleUrls: ['./post-list-order-picker.component.scss']
})
export class PostListOrderPickerComponent implements OnInit {

  selectedOrder: PostListOrder = DEFAULT_ORDER;

  constructor() {
  }

  ngOnInit(): void {
  }

  onHotOrderPicked(): void {
    // send to back
    this.selectedOrder = "hot";
  }

  onNewOrderPicked(): void {
    // send to back
    this.selectedOrder = "new";
  }

  onTopOrderPicked(): void {
    // send to back
    this.selectedOrder = "top";
  }

}
