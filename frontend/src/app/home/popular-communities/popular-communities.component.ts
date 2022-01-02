import {Component} from '@angular/core';
import {Subtiredd} from "../../interfaces/subtiredd";

@Component({
  selector: 'trd-popular-communities',
  templateUrl: './popular-communities.component.html',
  styleUrls: ['./popular-communities.component.scss']
})
export class PopularCommunitiesComponent {

  popularCommunities: Subtiredd[] = [
    {
      id: 1,
      name: "first",
      description: "description",
      imageUrl: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
      createdAt: new Date("2021-12-18T18:21:00Z"),
      adminId: "1"
    },
    {
      id: 2,
      name: "second",
      description: "description",
      imageUrl: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
      createdAt: new Date("2021-12-18T18:21:00Z"),
      adminId: "2"
    },
    {
      id: 3,
      name: "third",
      description: "description",
      imageUrl: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
      createdAt: new Date("2021-12-18T18:21:00Z"),
      adminId: "3"
    },
    {
      id: 4,
      name: "fourth",
      description: "description",
      imageUrl: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
      createdAt: new Date("2021-12-18T18:21:00Z"),
      adminId: "4"
    },
    {
      id: 5,
      name: "fifth",
      description: "description",
      imageUrl: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
      createdAt: new Date("2021-12-18T18:21:00Z"),
      adminId: "5"
    }
  ]
}
