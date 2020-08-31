import { Routes, RouterModule } from "@angular/router";

import { NgModule } from "@angular/core";
import { DataComponent } from './@features/data/data.component';

const routes: Routes = [
  { path: "", component: DataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
