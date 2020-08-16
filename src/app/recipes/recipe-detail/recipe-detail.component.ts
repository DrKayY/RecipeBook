import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../Store/app.reducer';
import * as RecipesActions from '../store/recipes.action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>
              ) { }

  ngOnInit() {
    this.route.params
      .pipe(
        map((params: Params) => {
          return +params.id;
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map((recipesState) => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  toEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  toDeleteRecipe() {
    if (confirm('Confirm delete')) {
      this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
      this.router.navigate(['/recipes']);
    } else {
      return;
    }
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
}
