import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {  AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  msg: string = null;

  constructor(private authService:AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchAuthMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm){
  if (!form.valid){
    return;
  }
  const email = form.value.email;
  const password = form.value.password;
  
  let authObs: Observable<AuthResponseData>

  this.isLoading = true;
    
  if (this.isLoginMode){
    authObs = this.authService.login(email, password);
  } else {
    authObs = this.authService.signup(email,password);
  }
  authObs.subscribe(
    resData => {
      console.log("Auth Response Success: ", resData);
      this.isLoading= false;
      if (this.isLoginMode){
        this.router.navigate(['exercise'])
      } else {
        this.isLoginMode = !this.isLoginMode
        this.msg = "Thank you for signing up.  Please Login"  
      }
      if (this.error) this.error = null;
    },
       errorMsg => {
        console.log(errorMsg);
        this.error = errorMsg.message;
        this.isLoading = false;
      }
    );
    form.reset()
  }
  onHandleError(){
    this.error = null;
  }
}