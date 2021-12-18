import { Component, OnInit } from '@angular/core';
import {PostInfo} from "../../interfaces/post-info";

@Component({
  selector: 'trd-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  postInfo : PostInfo = {
    title: "This is a post",
    subtireddName: "t/subtiredd",
    score: 100,
    userVote: "upVote"
  }

  constructor() { }

  ngOnInit(): void {
  }
}
