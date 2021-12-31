import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateCommunityFormOutput} from "../../interfaces/create-community-form-output";
import {SnackbarService} from "../../services/snackbar.service";
import {SubtireddService} from "../../services/subtiredd.service";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'trd-create-community-modal',
  templateUrl: './create-community-modal.component.html',
  styleUrls: ['./create-community-modal.component.scss']
})
export class CreateCommunityModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) data: string, private matDialogRef: MatDialogRef<CreateCommunityModalComponent>,
              private snackbarService: SnackbarService, private subtireddService: SubtireddService) {

    this.subtireddService.subtireddCreated$.pipe(take(1)).subscribe(_ => this.onCreatedSubtiredd());
    this.subtireddNameConflict$ = subtireddService.subtireddNameConflict$;

  }

  subtireddNameConflict$: Observable<void>

  onFormSubmit(communityData: CreateCommunityFormOutput) {
    this.subtireddService.createSubtiredd(communityData)
  }

  onCloseClick() {
    this.matDialogRef.close();
  }

  onCreatedSubtiredd() {
    this.snackbarService.openSuccessSnackbar("createCommunitySuccess")
    this.matDialogRef.close();
  }

}
