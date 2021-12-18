import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'trd-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  constructor() { }

  @Output() closeClick: EventEmitter<void> = new EventEmitter<void>()

  onCloseClick(): void {
    this.closeClick.emit();
  }

  ngOnInit(): void {
  }

}
