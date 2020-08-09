import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';
import { User } from '../user';
import { AuthService } from '../auth.service';

const apiKey = environment.firebaseAPIKey;

export interface FirebaseAuthRes {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }

const handleAuthentication = (resData: FirebaseAuthRes) => {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthSuccess({
            email: resData.email,
            id: resData.idToken,
            token: resData.idToken,
            expirationDate
        });
  };

const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
            return of(new AuthActions.AuthFail(errorMessage));
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
    return of(new AuthActions.AuthFail(errorMessage));
};

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http
                .post<FirebaseAuthRes>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }).pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(resData => {
                        return handleAuthentication(resData);
                    }),
                    catchError((errorRes) => {
                        return handleError(errorRes);
                    }));
        })
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
                .post<FirebaseAuthRes>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(resData => {
                        return handleAuthentication(resData);
                    }),
                    catchError((errorRes) => {
                        return handleError(errorRes);
                    }));
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {email: string, id: string, _token: string, _expirationDate: string} = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: 'DUMMY' };
            }
            const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._expirationDate));
            if (loadedUser.token) {
                const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);
                return new AuthActions.AuthSuccess({
                    email: loadedUser.email,
                    id: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._expirationDate)
                });
            }
            return { type: 'DUMMY' };
        })
        );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTH_SUCCESS),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {}

}
