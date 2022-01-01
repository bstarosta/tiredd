import {Component, Input} from '@angular/core';
import {Subtiredd} from "../../interfaces/subtiredd";

@Component({
  selector: 'trd-popular-community-item',
  templateUrl: './popular-community-item.component.html',
  styleUrls: ['./popular-community-item.component.scss']
})
export class PopularCommunityItemComponent {

  @Input() index: number
  @Input() community: Subtiredd

}
