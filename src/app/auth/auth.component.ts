import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../Store/app.reducer';
import * as AuthActions from './Store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  loginMode = true;
  loading = false;
  error: string = null;
  storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.loading = authState.loading;
      this.error = authState.errorMessage;
    });
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    } else {

      this.loading = true;
      this.error = null;

      if (this.loginMode) {
        this.store.dispatch(new AuthActions.LoginStart({email: form.value.email, password: form.value.password}));
      } else {
        this.store.dispatch(new AuthActions.SignupStart({email: form.value.email, password: form.value.password}));
        }

    }

    form.reset();
  }

  onHandleError(){
    this.store.dispatch(new AuthActions.ClearError());
  }
}
