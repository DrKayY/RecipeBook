import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from './auth/auth.service';
import * as fromApp from './Store/app.reducer';
import * as AuthActions from './auth/Store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());
  }

}
