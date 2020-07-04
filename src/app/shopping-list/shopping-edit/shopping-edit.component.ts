import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

import { Ingredient } from 'src/app/recipes/shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') ingNameRef: ElementRef;
  @ViewChild('amountInput') ingAmountRef: ElementRef;
  // @Output() newIngredient = new EventEmitter();
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredient() {
    const ingName = this.ingNameRef.nativeElement.value;
    const ingAmount = this.ingAmountRef.nativeElement.value;
    const ing = new Ingredient(ingName, ingAmount);

    this.shoppingListService.addNewIngredient(ing);
    // this.newIngredient.emit();
  }
}
