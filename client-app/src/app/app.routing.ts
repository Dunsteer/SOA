import { Routes, RouterModule } from "@angular/router";

import { NgModule } from "@angular/core";
//import { LoginComponent } from "./features/login/login.component";

const routes: Routes = [
  //{ path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
