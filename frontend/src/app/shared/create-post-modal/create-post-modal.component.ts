import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {SnackbarService} from "../../services/snackbar.service";
import {PostService} from "../../services/post.service";
import {take} from "rxjs/operators";
import {Post} from "../../interfaces/post";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

const CREATE_POST_FORM_ERROR_MESSAGE_KEYS: ValidationErrors = {
  title: {
    required: "error.postTitle.required",
  },
  text: {
    required: "error.postText.required"
  },
  imageUrl: {
    invalidUrl: "error.postImageUrl.invalidUrl"
  }
}

@Component({
  selector: 'trd-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent implements OnInit {

  validationErrorsMessageKeys: ValidationErrors = CREATE_POST_FORM_ERROR_MESSAGE_KEYS
  subtireddSelectItems: SubtireddSelectItem[] = [
    {id: 1, name: "awww"},
    {id: 2, name: "whatswrongwithyourdog"},
    {id: 3, name: "dachschund"},
    {id: 4, name: "corgi"},
    {id: 5, name: "dogs"},
  ]

  selectedSubtiredd: SubtireddSelectItem;
  textSelected: Boolean = true;

  textValidators = [Validators.required]
  imageUrlValidators = [this.isValidHttpUrl]
  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    text: new FormControl(null),
    imageUrl: new FormControl(null)
  })

  isValidHttpUrl(control: AbstractControl) {
    const invalidUrl = {invalidUrl: true}
    try {
      const url = new URL(control.value);
      const isHttp = url.protocol === "http:" || url.protocol === "https:"
      return isHttp ? null : invalidUrl;
    } catch (_) {
      return invalidUrl
    }
  }

  get title() {
    return this.form.get("title")
  }

  get text() {
    return this.form.get("text")
  }

  get imageUrl() {
    return this.form.get("imageUrl")
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: string,
    private matDialogRef: MatDialogRef<CreatePostModalComponent>,
    private snackbarService: SnackbarService,
    private postService: PostService
  ) {
    this.postService.postCreated$.pipe(take(1)).subscribe(post => this.onCreatedPost(post))
    this.setFormValidators()
  }

  ngOnInit() {
    this.selectedSubtiredd = this.subtireddSelectItems[0];
  }

  onSubmit() {
    this.postService.createPost({
      subtireddId: this.selectedSubtiredd.id,
      ...this.form.value
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
    this.setFormValidators();
  }

  setFormValidators() {
    if (this.textSelected) {
      this.form.get("text").setValidators(this.textValidators)
      this.form.get("imageUrl").clearValidators()
      this.form.reset("imageUrl")
    } else {
      this.form.get("imageUrl").setValidators(this.imageUrlValidators)
      this.form.get("text").clearValidators()
      this.form.reset("text")
    }
  }

  onCreatedPost(post: Post) {
    this.snackbarService.openSuccessSnackbar("createPostSuccess")
    this.matDialogRef.close()
  }
}
