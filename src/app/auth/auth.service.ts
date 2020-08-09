import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as fromApp from '../Store/app.reducer';
import * as AuthActions from './Store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.AppState>) { }

  setLogoutTimer(tokenExpirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, tokenExpirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}
