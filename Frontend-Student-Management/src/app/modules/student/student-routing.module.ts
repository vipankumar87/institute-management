import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./student-components/dashboard/dashboard.component";

const routes: Routes = [
  { path: "students", component: DashboardComponent},
  {path:"", redirectTo: "students", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
