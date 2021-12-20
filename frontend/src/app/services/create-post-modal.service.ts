import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {CreatePostModalComponent} from "../shared/create-post-modal/create-post-modal.component";

const CREATE_POST_MODAL_CONFIG: MatDialogConfig = {
  height: "85vh",
  width: "50vw"
}

@Injectable({
  providedIn: 'root'
})
export class CreatePostModalService {

  constructor(private matDialog: MatDialog) {
  }

  openAccountModal(): Observable<any> {
    return this.matDialog.open(CreatePostModalComponent, {data: CREATE_POST_MODAL_CONFIG}).afterClosed()
  }
}
