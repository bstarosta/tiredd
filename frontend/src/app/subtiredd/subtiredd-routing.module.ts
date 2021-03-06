import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubtireddPageComponent} from "./subtiredd-page/subtiredd-page.component";
import {PostPageComponent} from "./post-page/post-page.component";

const routes: Routes = [
  {path: ":subtireddName", component: SubtireddPageComponent},
  {path: ":subtireddName/:postId", component: PostPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubtireddRoutingModule {
}
