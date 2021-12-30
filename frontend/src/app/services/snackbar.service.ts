import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {SuccessSnackbarComponent} from "../shared/success-toast/success-snackbar.component";

const SUCCESS_SNACKBAR_CONFIG: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition: "right",
  verticalPosition: "bottom",
  panelClass: "success-snackbar",
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private matSnackBar: MatSnackBar) {
  }

  openSuccessSnackbar(messageKey: string): void {
    this.matSnackBar.openFromComponent(SuccessSnackbarComponent, {data: messageKey, ...SUCCESS_SNACKBAR_CONFIG})
  }
}
