import { Routes, RouterModule } from "@angular/router";

import { NgModule } from "@angular/core";
import { DataComponent } from './@features/data/data.component';
import { SetupComponent } from './@features/setup/setup.component';

const routes: Routes = [
  { path: "data", component: DataComponent },
  { path: "setup", component: SetupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
