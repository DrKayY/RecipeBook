import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../Store/app.reducer';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>) { }

  recipesPresent: boolean;
  storeSub: Subscription;

  ngOnInit(): void {
    this.storeSub = this.store.select('recipes').pipe(
      map((recipesState) => {
        this.recipesPresent = recipesState.recipes.length === 0 ? false : true;
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
