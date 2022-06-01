import {Component, OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./navbar.component.html",
  styleUrls: ['./navbar.component.css']
})

export class NavBarComponent implements OnInit, OnDestroy{
  public isMenuCollapsed = true; 
  isAuthenticated = false;
  private userSub: Subscription

  constructor(private authService: AuthService ){}

  ngOnInit(){
    this.userSub = this.authService.currentUser.subscribe((currentUser) => {
    this.isAuthenticated = !currentUser ? false : true 
    });   
  }
  ngOnDestroy() {
  this.userSub.unsubscribe()
  }

  onLogout(){
    this.authService.signOut();
  }
}