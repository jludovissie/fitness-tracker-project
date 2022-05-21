import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})

export class AuthComponent{

  isLogin = true; 

  constructor(private authService: AuthService){}
  
  onSwitch(){
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm){
    if (!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password; 

    let authObs: Observable<AuthResponseData>

    if (this.isLogin) {
      this.authService.login(email, password).subscribe(
        resData =>{
          console.log(resData);
        },
        error=>{
          console.log(error);
        }
      );  
    } else {
      this.authService.signup(email, password).subscribe(
        resData =>{
          console.log(resData);
        },
        error=>{
          console.log(error);
        }
      );
    }  

    form.reset();
  }
}