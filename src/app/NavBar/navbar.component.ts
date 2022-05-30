import {Component, OnDestroy, OnInit} from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./navbar.component.html",
  styleUrls: ['./navbar.component.css']
})

export class NavBarComponent implements OnInit, OnDestroy{
  public isMenuCollapsed = true; 
  isAuthenticated = false;

  constructor(private authService: AuthService ){}

  ngOnInit(){
    this.authService.currentUser.subscribe(currentUser => {
    this.isAuthenticated = !currentUser ? false : true 
    });   
  }
  ngOnDestroy(): void {
    this.authService.currentUser.subscribe((user)=>{
      this.isAuthenticated = !!user
    });  
  }
  onLogout(){
    this.authService.signOut();
  }
}