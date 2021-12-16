import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "home", loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: "t", loadChildren: () => import('./subtiredd/subtiredd.module').then(m => m.SubtireddModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
