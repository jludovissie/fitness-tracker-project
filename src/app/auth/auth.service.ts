import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  userToken: string = null;

  //user= new Subject<User>();

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://codelabs-fitness-api.herokuapp.com/api/v1/users/create', 
    {
      email: email,
      password: password
    })
  }
  
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.currentUser.next(user);

    this.autoSignout(expiresIn);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = 'An unknown error has occurred';
  //   if (!errorRes.error || errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }
  //   switch (errorRes.error.error.message) {
  //     case 'Email_Exists':
  //       errorMessage = 'this email exists already';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'This email does not exist.';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'This password is invalid';
  //       break;
  //   }
  //   return throwError(errorMessage);
  // }
  login(email: string, password: string) {
    return this.http
      .post<any>(
        'https://codelabs-fitness-api.herokuapp.com/api/v1/users/login',
        {
          email: email,
          password: password,
        })
        .pipe(
          // catchError(this.handleError),
          tap((resData) => {
            const {email, id} = resData.payload.user;
            const { expiry, value } = resData.payload.token;
            const expiresIn = new Date(expiry).getTime() - Date.now()

            this.handleAuthentication(
            resData.email,
            resData.id,
            resData.value,
            resData.expiresIn
          );
        })
      );
    }
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.currentUser.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
        this.autoSignout(expirationDuration);
    }
  }
  signOut() {
    this.http
    .delete('https://codelabs-fitness-api.herokuapp.com/api/v1/users/logout')
    .subscribe((res: any)=> {
      if(res.success){
      console.log('Res Logout', res);

      this.currentUser.next(null);
      
      localStorage.removeItem('userData');
      
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
        this.router.navigate(['auth']);
      } 
    }
  });
 }  
  
  autoSignout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }
}