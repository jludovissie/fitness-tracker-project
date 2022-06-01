import { Injectable } from '@angular/core';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';


@Injectable({providedIn:'root'})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req) 
        } 
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: "Bearer " + user.token
          }
        });
        return next.handle(modifiedReq)
      })
    );
  }
}      
      
