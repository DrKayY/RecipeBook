import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../Store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipesService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>
              ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.recipe = this.recipesService.getRecipe(+params.id);
      }
    );
  }

  toEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  toDeleteRecipe() {
    if (confirm('Confirm delete')) {
      this.recipesService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
    } else {
      return;
    }
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
}
