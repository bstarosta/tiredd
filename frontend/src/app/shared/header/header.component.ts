import {Component} from '@angular/core';
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";
import {Router} from "@angular/router";

@Component({
  selector: 'trd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) {
  }

  subtireddSelectItems: SubtireddSelectItem[] = [
    {name: "Home", url: "/home"},
    {name: "t/awww", url: "/t/awww"},
    {name: "t/whatswrongwithyourdog", url: "/t/whatswrongwithyourdog"},
    {name: "t/dachschund", url: "/t/dachschund"},
    {name: "t/corgi", url: "/t/corgi"},
    {name: "t/dogs", url: "/t/dogs"},
  ]
  userLoggedIn: boolean = false;

  onLogIn(): void {
    this.userLoggedIn = true
  }

  onLogOut(): void {
    this.userLoggedIn = false
  }

  onSubtireddSelected(subtireddSelectItem: SubtireddSelectItem) {
    this.router.navigate([subtireddSelectItem.url]);
  }

}
