import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {noAuthGuard} from "./auth/guard/no-auth-guard/no-auth.guard";
import {adminGuard} from "./auth/guard/admin-guard/admin.guard";
import {studentGuard} from "./auth/guard/student-guard/student.guard";

export const routes: Routes = [
  {path: "login", component: LoginComponent, canActivate: [noAuthGuard]},
  { path: "admin", loadChildren: ()=>import("./modules/admin/admin.module").then(m => m.AdminModule), canActivate: [adminGuard]},
  { path: "students", loadChildren: () => import("./modules/student/student.module").then(m => m.StudentModule), canActivate: [studentGuard] },
];
