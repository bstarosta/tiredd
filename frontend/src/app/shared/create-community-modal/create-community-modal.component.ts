import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateCommunityFormOutput} from "../../interfaces/create-community-form-output";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'trd-create-community-modal',
  templateUrl: './create-community-modal.component.html',
  styleUrls: ['./create-community-modal.component.scss']
})
export class CreateCommunityModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) data: string, private matDialogRef: MatDialogRef<CreateCommunityModalComponent>,
              private snackbarService: SnackbarService) {

  }

  onFormSubmit(communityData: CreateCommunityFormOutput) {
    this.onCloseClick();
  }

  onCloseClick() {
    this.snackbarService.openSuccessSnackbar("createCommunitySuccess")
    this.matDialogRef.close();
  }

}
