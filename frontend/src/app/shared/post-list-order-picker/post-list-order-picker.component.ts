import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostListOrder} from "../../types/post-list-order";

@Component({
  selector: 'trd-post-list-order-picker',
  templateUrl: './post-list-order-picker.component.html',
  styleUrls: ['./post-list-order-picker.component.scss']
})
export class PostListOrderPickerComponent {

  @Input() selectedOrder: PostListOrder;
  @Output() orderPicked: EventEmitter<PostListOrder> = new EventEmitter<PostListOrder>();

  onHotOrderPicked(): void {
    this.orderPicked.emit("hot");
  }

  onNewOrderPicked(): void {
    this.orderPicked.emit("new");
  }

  onTopOrderPicked(): void {
    this.orderPicked.emit("top");
  }

}
