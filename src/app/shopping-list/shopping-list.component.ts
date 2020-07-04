import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../recipes/shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.newIngredientsEvent
      .subscribe(
        (ings: Ingredient[]) => {
          this.ingredients = ings;
        }
      );
  }

}
