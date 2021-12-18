import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AccountModalComponent} from "../shared/security/account-modal/account-modal.component";
import {Observable} from "rxjs";

export type AccountModalMode = "login" | "register"

const ACCOUNT_MODAL_CONFIG: MatDialogConfig = {
  height: "80vh",
  width: "40vw",
  panelClass: "account-dialog-container"
}

@Injectable({
  providedIn: 'root'
})
export class AccountModalService {

  constructor(private matDialog: MatDialog) { }

  openAccountModal(mode: AccountModalMode): Observable<any> {
    return this.matDialog.open(AccountModalComponent, {data: mode, ...ACCOUNT_MODAL_CONFIG}).afterClosed()
  }
}
