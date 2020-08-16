import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../Store/app.reducer';
import * as AuthActions from '../auth/Store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSubs: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  ngOnInit() {
    this.userSubs = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(userData => {
      this.isAuthenticated = !!userData;
    });
  }

  onSaveData() {
    if (confirm('Are you sure?')) {
      this.store.dispatch(new RecipesActions.StoreRecipes());
    } else {
      return;
    }
  }

  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout() {
    if (confirm('Are you sure?')) {
      this.store.dispatch(new AuthActions.Logout());
    } else {
      return;
    }
  }
}
