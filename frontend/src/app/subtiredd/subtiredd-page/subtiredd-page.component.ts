import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'trd-subtiredd-page',
  templateUrl: './subtiredd-page.component.html',
  styleUrls: ['./subtiredd-page.component.scss']
})
export class SubtireddPageComponent {

  constructor(private route: ActivatedRoute) {
    this.subtireddName = route.snapshot.paramMap.get("name");
  }

  subtireddName: string

}
