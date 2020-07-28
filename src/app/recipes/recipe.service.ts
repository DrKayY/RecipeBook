import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  // selectRecipeEvent = new EventEmitter<Recipe>();
  // private recipes: Recipe[] = [
  //   new Recipe('Test Recipe1',
  //   'Description1',
  //   'https://c.pxhere.com/images/15/3d/9ee477ee62341b9480ce314b02f8-1417897.jpg!d',
  //   [
  //     new Ingredient('wheat', 4),
  //     new Ingredient('tea', 4)
  //   ]),
  //   new Recipe('Test Recipe2',
  //   'Description2',
  //   'https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg',
  //   [
  //     new Ingredient('oil', 2),
  //     new Ingredient('egg', 2)
  //   ])
  // ];

  private recipes: Recipe[] = [];

  constructor() { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  // getRecipe(name: string) {
  //   return this.recipes.find(recipe => recipe.name === name);
  // }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  // getRecipesNumber(): number {
  //   return this.recipes.length;
  // }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
