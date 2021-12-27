import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";

@Component({
  selector: 'trd-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent {

  userId: string;
  subtireddSelectItems: SubtireddSelectItem[] = [
    {name: "awww"},
    {name: "whatswrongwithyourdog"},
    {name: "dachschund"},
    {name: "corgi"},
    {name: "dogs"},
  ]
  selectedSubtiredd?: SubtireddSelectItem;

  constructor(@Inject(MAT_DIALOG_DATA) data: string, private matDialogRef: MatDialogRef<CreatePostModalComponent>) {
    this.userId = data;
  }

  onCloseClick(): void {
    this.matDialogRef.close();
  }

  onSubtireddSelected(selectedSubtiredd: SubtireddSelectItem) {
    this.selectedSubtiredd = selectedSubtiredd;
    console.log(selectedSubtiredd.name);
  }
}
