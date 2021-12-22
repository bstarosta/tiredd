import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccountModalMode} from "../../../services/account-modal.service";

@Component({
  selector: 'trd-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss']
})
export class AccountModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AccountModalMode, private matDialogRef: MatDialogRef<AccountModalComponent>) {
    this.mode = data;
  }

  mode: AccountModalMode;

  onCloseClick(): void {
    this.matDialogRef.close();
  }

  onLoginSuccess(): void {
    this.matDialogRef.close();
  }

  switchMode(mode: AccountModalMode) {
    this.mode = mode;
  }

}
