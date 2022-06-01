import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router){}
  
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.authService.currentUser.pipe(
      take(1),
      map((user) => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(userData){
          this.authService.autoLogin();
          return true;
        } else {
          return this.router.createUrlTree(['auth'])
        } 
     })
    )
  }
}
