import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  kind: string,
  idToken: string, 
  email: string, 
  refreshToken: string, 
  expiresIn: string, 
  localId: string,
  registered?: boolean 
}

@Injectable({providedIn: 'root'})

export class AuthService {
  constructor(private http: HttpClient){}

  signup(email:string, password: string){
    this.http.post<AuthResponseData>
    ('',
      {
        email: "",
        password: "",
        returnSecureToken: true 
      }
    );
  }

  login(email:string, password: string){
    this.http.post<AuthResponseData>
    ('',
      {
        email: "",
        password: "",
        returnSecureToken: true 
      }
    );  
  }
}