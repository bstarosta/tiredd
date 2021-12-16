import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  userLoggedIn: boolean = true;

  ngOnInit(): void {
  }

}
