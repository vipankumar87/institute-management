import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {StorageService} from "../../services/storage-service/storage.service";

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export const noAuthGuard: CanActivateFn = (next:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router = inject(Router);

  if( StorageService.hasToken() && StorageService.isStudentLogin()){
    router.navigate(['/students/dashboard']);
    return false
  }
  if( StorageService.hasToken() && StorageService.isAdminLogin()){
    router.navigate(['/admin/dashboard']);
    return false
  }
  return true;
};
