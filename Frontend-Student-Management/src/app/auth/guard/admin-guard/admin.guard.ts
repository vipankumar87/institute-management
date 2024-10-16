import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {StorageService} from "../../services/storage-service/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const snackBar: MatSnackBar = inject(MatSnackBar);
  console.log('admin check')
  if( StorageService.hasToken() && StorageService.isStudentLogin()){
    router.navigate(['/students/dashboard']);
    snackBar.open("You don't have access to this page", "Close", {duration: 5000})
    return false
  }
  if( !StorageService.hasToken() ){
    StorageService.logOut().subscribe(()=>{
      console.log("Logout Successfully")
      router.navigate(['/login']);
      snackBar.open("You are logged out", "Close", {duration: 5000})
    })
    return false;
  }
  return true;
};
