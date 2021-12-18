import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccountModalMode} from "../../../services/account-modal.service";

@Component({
  selector: 'trd-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss']
})
export class AccountModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AccountModalMode, private matDialogRef: MatDialogRef<AccountModalComponent>) { }

  onCloseClick(): void {
    this.matDialogRef.close();
  }

  ngOnInit(): void {
  }

}
