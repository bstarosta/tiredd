import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";

@Component({
  selector: 'trd-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent {

  subtireddSelectItems: SubtireddSelectItem[] = [
    {name: "awww"},
    {name: "whatswrongwithyourdog"},
    {name: "dachschund"},
    {name: "corgi"},
    {name: "dogs"},
  ]
  selectedSubtiredd?: SubtireddSelectItem;

  constructor(@Inject(MAT_DIALOG_DATA) config: MatDialogConfig, private matDialogRef: MatDialogRef<CreatePostModalComponent>) {
  }

  onCloseClick(): void {
    this.matDialogRef.close();
  }

  onSubtireddSelected(selectedSubtiredd: SubtireddSelectItem) {
    this.selectedSubtiredd = selectedSubtiredd;
    console.log(selectedSubtiredd.name);
  }
}
