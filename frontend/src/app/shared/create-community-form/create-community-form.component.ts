import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {CreateCommunityFormOutput} from "../../interfaces/create-community-form-output";
import {Observable, Subscription} from "rxjs";

const CREATE_COMMUNITY_FORM_ERROR_MESSAGE_KEYS: ValidationErrors = {
  name: {
    required: "error.communityName.required",
    maxlength: "error.communityName.maxLength",
    conflict: "error.communityName.conflict"
  },
  imageUrl : {
    required: "error.communityBackground.required"
  },
  description: {
    required: "error.communityDescription.required"
  }
}

@Component({
  selector: 'trd-create-community-form',
  templateUrl: './create-community-form.component.html',
  styleUrls: ['./create-community-form.component.scss']
})
export class CreateCommunityFormComponent implements OnInit, OnDestroy{

  validationErrorsMessageKeys: ValidationErrors = CREATE_COMMUNITY_FORM_ERROR_MESSAGE_KEYS
  @Input() subtireddNameConflict$: Observable<void>
  @Output() formSubmitted: EventEmitter<CreateCommunityFormOutput> = new EventEmitter<CreateCommunityFormOutput>();
  subtireddNameConflictSubscription: Subscription;

  form: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    imageUrl: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required)
  })


  get name() {
    return this.form.get("name");
  }

  get description() {
    return this.form.get("description");
  }

  get imageUrl() {
    return this.form.get("imageUrl");
  }

  onSubmit(): void {
    this.formSubmitted.emit(this.form.value);
  }

  ngOnInit(): void {
    this.subtireddNameConflictSubscription = this.subtireddNameConflict$.subscribe( _ => {
      this.name.setErrors({conflict: true});
    })
  }

  ngOnDestroy(): void {
    this.subtireddNameConflictSubscription.unsubscribe();
  }

}
