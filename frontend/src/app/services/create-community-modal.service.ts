import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {CreateCommunityModalComponent} from "../shared/create-community-modal/create-community-modal.component";

const CREATE_COMMUNITY_MODAL_CONFIG: MatDialogConfig = {
  height: "75vh",
  width: "30vw",
  disableClose: true
}

@Injectable({
  providedIn: 'root'
})
export class CreateCommunityModalService {

  constructor(private matDialog: MatDialog) { }

  userId: string = "id" // TODO: Remove id

  openCreateCommunityModal(): Observable<any> {
    return this.matDialog.open(CreateCommunityModalComponent, {data: this.userId, ...CREATE_COMMUNITY_MODAL_CONFIG}).afterClosed()
  }
}
