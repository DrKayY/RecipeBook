import { Injectable, EventEmitter } from '@angular/core';

import { Ingredient } from '../recipes/shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ];

  newIngredientsEvent = new EventEmitter<Ingredient[]>();

constructor() { }

getIngredients() {
  return this.ingredients.slice();
}

addNewIngredient(ingredient: Ingredient) {
  this.ingredients.push(ingredient);
  this.newIngredientsEvent.emit(this.ingredients.slice());
}

addIngsToShoppingList(ingredients: Ingredient[]) {
  // ingredients.forEach(ing => {
    //   this.ingredients.push(ing);
    // });
    this.ingredients.push(...ingredients);
    this.newIngredientsEvent.emit(this.ingredients.slice());
}
}
