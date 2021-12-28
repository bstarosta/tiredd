import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'trd-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent implements OnInit {

  userId: string;
  subtireddSelectItems: SubtireddSelectItem[] = [
    {name: "awww"},
    {name: "whatswrongwithyourdog"},
    {name: "dachschund"},
    {name: "corgi"},
    {name: "dogs"},
  ]

  selectedSubtiredd: SubtireddSelectItem;
  textSelected: Boolean = true;
  title: string;
  text: string;
  imageUrl: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: string, private matDialogRef: MatDialogRef<CreatePostModalComponent>) {
    this.userId = data;
  }

  ngOnInit() {
    this.selectedSubtiredd = this.subtireddSelectItems[0];
  }

  onCloseClick() {
    this.matDialogRef.close();
  }

  onSubtireddSelected(selectedSubtiredd: SubtireddSelectItem) {
    this.selectedSubtiredd = selectedSubtiredd;
  }

  onTabSelected(event: MatTabChangeEvent) {
    this.textSelected = event.index == 0;
  }

  isTitleEmpty(): Boolean {
    return !this.title
  }

  isContentEmpty(): Boolean {
    return this.textSelected ? !this.text : !this.imageUrl;
  }

  onPostClick() {
    if (this.textSelected) {
      console.log("Subtiredd name: " + this.selectedSubtiredd.name);
      console.log("Title: " + this.title);
      console.log("Text: " + this.text);
    } else {
      console.log("Subtiredd name: " + this.selectedSubtiredd.name);
      console.log("Title: " + this.title);
      console.log("ImageUrl: " + this.imageUrl);
    }
  }
}
