import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {CreatePostFormOutput} from "../../interfaces/create-post-form-output";
import {SnackbarService} from "../../services/snackbar.service";
import {PostService} from "../../services/post.service";
import {take} from "rxjs/operators";
import {Post} from "../../interfaces/post";

@Component({
  selector: 'trd-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent implements OnInit {

  subtireddSelectItems: SubtireddSelectItem[] = [
    {id: 1, name: "awww"},
    {id: 2, name: "whatswrongwithyourdog"},
    {id: 3, name: "dachschund"},
    {id: 4, name: "corgi"},
    {id: 5, name: "dogs"},
  ]

  selectedSubtiredd: SubtireddSelectItem;
  textSelected: Boolean = true;
  title: string;
  text: string;
  imageUrl: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: string,
    private matDialogRef: MatDialogRef<CreatePostModalComponent>,
    private snackbarService: SnackbarService,
    private postService: PostService
  ) {
    this.postService.postCreated$.pipe(take(1)).subscribe(post => this.onCreatedPost(post))
  }

  ngOnInit() {
    this.selectedSubtiredd = this.subtireddSelectItems[0];
  }

  onSubmit() {
    this.postService.createPost({
      title: this.title,
      ...(this.textSelected) && {text: this.text},
      ...(!this.textSelected) && {imageUrl: this.imageUrl},
      subtireddId: this.selectedSubtiredd.id,
    })
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

  onCreatedPost(post: Post) {
    this.snackbarService.openSuccessSnackbar("createPostSuccess")
    this.matDialogRef.close()
  }
}
