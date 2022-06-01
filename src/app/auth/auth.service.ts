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

export interface userData {
  email: string; 
  id: string; 
  _token: string; 
  _tokenExpirationDate: string; 
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
    return this.http.post<any>(
      'https://codelabs-fitness-api.herokuapp.com/api/v1/users/create', 
    {
      email: email,
      password: password
    })
  }
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

            this.handleAuth(
            resData.email,
            resData.id,
            resData.value,
            resData.expiresIn
          );
        })
      );
    }
    signOut() {
      this.http
      .delete('https://codelabs-fitness-api.herokuapp.com/api/v1/users/logout')
      .subscribe((res: any)=> {
        console.log('Res Logout', res);
        if(res.success){
        this.currentUser.next(null);
        
        localStorage.removeItem('userData');
        
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
          this.router.navigate(['auth']);
        } else{
          console.log("Something went wrong")
        }
      }
    });
   }  
  autoLogin() {
   const userData: userData = JSON.parse(localStorage.getItem('userData'));

   if (!userData) return; 

   const {email, id, _token, _tokenExpirationDate} = userData; 

  const loadedUser = new User(
    email,
    id,
    _token,
    new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.currentUser.next(loadedUser);

      const expirationDuration =
        new Date(_tokenExpirationDate).getTime() - new Date().getTime();
        this.autoSignout(expirationDuration);
    }
  }
 
  
  autoSignout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }
  handleAuth(email: string, userId: string, token: string, expiresIn: number){
    const expDate = new Date(new Date().getTime() + expiresIn);

    const user = new User(email, userId, token, expDate); 
      this.currentUser.next(user);
    
    this.autoSignout(expiresIn);

    localStorage.setItem('userData', JSON.stringify(user))
  }
}