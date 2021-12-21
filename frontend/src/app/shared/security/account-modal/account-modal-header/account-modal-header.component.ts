import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'trd-account-modal-header',
  templateUrl: './account-modal-header.component.html',
  styleUrls: ['./account-modal-header.component.scss']
})
export class AccountModalHeaderComponent {

  @Input() titleKey: string;
  @Input() messageKey: string;

  @Output() closeClick: EventEmitter<void> = new EventEmitter<void>()

  onCloseClick() {
    this.closeClick.emit()
  }

}
