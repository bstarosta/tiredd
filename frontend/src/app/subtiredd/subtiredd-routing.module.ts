import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubtireddPageComponent} from "./subtiredd-page/subtiredd-page.component";

const routes: Routes = [
  { path: ":name", component: SubtireddPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubtireddRoutingModule {
}
