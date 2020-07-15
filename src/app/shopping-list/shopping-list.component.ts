import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../recipes/shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingChangedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnDestroy(): void {
    this.ingChangedSubscription.unsubscribe();
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingChangedSubscription =  this.shoppingListService.newIngredientsEvent
      .subscribe(
        (ings: Ingredient[]) => {
          this.ingredients = ings;
        }
      );
  }

  onEditIng(index: number) {
    this.shoppingListService.ingToEdit.next(index);
  }

}
