import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';

import { User } from './user';

export interface FirebaseAuthRes {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new Subject<User>();
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http
      .post<FirebaseAuthRes>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5PhwXYja74ZBTOP7rD__MSlOPKrj9Uxc',
        {
          email,
          password,
          returnSecureToken: true
        }).pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentiction(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
  }

  signIn(email: string, password: string) {
    return this.http
      .post<FirebaseAuthRes>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5PhwXYja74ZBTOP7rD__MSlOPKrj9Uxc',
        {
          email,
          password,
          returnSecureToken: true
        }).pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentiction(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {email: string, id: string, _token: string, _expirationDate: string} = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._expirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(tokenExpirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, tokenExpirationDuration);
  }

  private handleAuthentiction(email: string, id: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
    switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'The email already exists';
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email is not found';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'Password is incorrect';
              break;
          }
    return throwError(errorMessage);
  }

}
