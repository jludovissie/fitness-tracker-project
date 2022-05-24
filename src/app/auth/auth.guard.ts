import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router){}
  
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const userData = JSON.parse(localStorage.getItem('userData'));

    if(userData){
      this.authService.autoLogin();
      return true;
    } else {
      return this.router.createUrlTree(['auth'])
    }
  }
}
