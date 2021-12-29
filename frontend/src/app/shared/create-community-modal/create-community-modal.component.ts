import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'trd-create-community-modal',
  templateUrl: './create-community-modal.component.html',
  styleUrls: ['./create-community-modal.component.scss']
})
export class CreateCommunityModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) data: string, private matDialogRef: MatDialogRef<CreateCommunityModalComponent>) {

  }

  onCloseClick() {
    this.matDialogRef.close();
  }

  ngOnInit(): void {
  }

}
