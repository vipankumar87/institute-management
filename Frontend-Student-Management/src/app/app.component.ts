import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {StorageService} from "./auth/services/storage-service/storage.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggle, MatToolbar, MatButton, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isAdminLoggedIn:boolean = false;
  isStudentLoggedIn:boolean = false;
  isLoaded = false; // Track loading state

  title = 'Frontend-Student-Management';
  constructor(private router: Router) {
  }
  ngOnInit(){
    this.updateLoggedInStatus();
    if(this.isAdminLoggedIn){
      this.router.navigate(['admin/']);
    }
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.updateLoggedInStatus();
      }
    })
  }
  private updateLoggedInStatus(): void{
    this.isAdminLoggedIn = StorageService.isAdminLogin();
    this.isStudentLoggedIn = StorageService.isStudentLogin();
    this.isLoaded = true;
  }
  logOut(){
    StorageService.logOut().subscribe(()=>{
      this.router.navigateByUrl("/login", {skipLocationChange: false})
        .then(r =>{
          console.log("logOut");
      } );
    })
  }
}
