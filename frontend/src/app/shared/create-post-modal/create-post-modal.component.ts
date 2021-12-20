import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'trd-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) config: MatDialogConfig, private matDialogRef: MatDialogRef<CreatePostModalComponent>) {
  }

  onCloseClick(): void {
    this.matDialogRef.close();
  }
}
