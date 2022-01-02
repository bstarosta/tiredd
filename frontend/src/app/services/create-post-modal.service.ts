import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {CreatePostModalComponent} from "../shared/create-post-modal/create-post-modal.component";
import {SubtireddSelectItem} from "../interfaces/subtiredd-select-item";

const CREATE_POST_MODAL_CONFIG: MatDialogConfig = {
  height: "70vh",
  width: "40vw"
}

@Injectable({
  providedIn: 'root'
})
export class CreatePostModalService {

  constructor(private matDialog: MatDialog) {
  }

  openCreatePostModal(currentSubtiredd: SubtireddSelectItem): Observable<any> {
    return this.matDialog.open(CreatePostModalComponent,{data: currentSubtiredd, ...CREATE_POST_MODAL_CONFIG}).afterClosed()
  }
}
