import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {CreatePostModalComponent} from "../shared/create-post-modal/create-post-modal.component";

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

  openCreatePostModal(): Observable<any> {
    return this.matDialog.open(CreatePostModalComponent, CREATE_POST_MODAL_CONFIG).afterClosed()
  }
}
