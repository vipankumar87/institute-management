import { Component } from '@angular/core';
import {AuthService} from "../auth/services/auth/auth.service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {HttpClient} from "@angular/common/http";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {Router} from "@angular/router";
import {StorageService} from "../auth/services/storage-service/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService, HttpClient],
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatHint,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatError,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatGridList,
    MatGridTile
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private svc: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar:MatSnackBar
  ) {
  }
  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.svc.login(this.loginForm.value).subscribe(response=>{
        console.log(response)
        if(StorageService.isAdminLogin()){
          this.router.navigateByUrl("/admin/dashboard")
        } else if(StorageService.isStudentLogin()) {
          this.router.navigateByUrl("/student/dashboard")
        }
      }, error => {
        if(error.status === 406 ){
          this.snackbar.open("User is not active", "Close", {
            duration: 5000
          })
        } else {
          this.snackbar.open("Bad Credentials", "Close")
        }
      })
    }
  }
}
