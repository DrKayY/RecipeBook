import { Injectable } from '@angular/core';

import { Ingredient } from '../recipes/shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ];
  newIngredientsEvent = new Subject<Ingredient[]>();
  ingToEdit = new Subject<number>();

constructor() { }

getIngredients() {
  return this.ingredients.slice();
}

getIngredient(index: number) {
  return this.ingredients[index];
}

addNewIngredient(ingredient: Ingredient) {
  this.ingredients.push(ingredient);
  this.newIngredientsEvent.next(this.ingredients.slice());
}

updateIngredient(index: number, newIngredient: Ingredient) {
  this.ingredients[index] = newIngredient;
  this.newIngredientsEvent.next(this.ingredients.slice());
}

addIngsToShoppingList(ingredients: Ingredient[]) {
  // ingredients.forEach(ing => {
    //   this.ingredients.push(ing);
    // });
    this.ingredients.push(...ingredients);
    this.newIngredientsEvent.next(this.ingredients.slice());
}

deleteIngredient(index: number) {
  this.ingredients.splice(index, 1);
  this.newIngredientsEvent.next(this.ingredients.slice());
}
}
