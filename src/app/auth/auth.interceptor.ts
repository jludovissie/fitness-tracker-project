// import { Injectable } from '@angular/core';
// import { exhaustMap } from 'rxjs/operators';
// import { AuthService } from './auth.service';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from './user.model';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(private authService: AuthService) {}

//   // intercept(request: HttpRequest<any>, next: HttpHandler){
//   // //   return this.authService.currentUser.pipe(
//   // //     take(1),
//   // //     exhaustMap((user) => {

//   // //       const modifiedReq = request.clone({
//   // //         setHeaders: {
//   // //           Authorization: "Bearer " + User.token 
//   // //         }
//   // //       })
//   // //       return next.handle(modifiedReq)
//   // //     })
//   // //   )
//   // // }
  
// }
