import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/recipes/shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  // @ViewChild('nameInput') ingNameRef: ElementRef;
  // @ViewChild('amountInput') ingAmountRef: ElementRef;
  // @Output() newIngredient = new EventEmitter();
  @ViewChild('f') ingForm: NgForm;
  editMode = false;
  ingToEditIndex: number;
  ingToEdit: Ingredient;
  ingToEditSubscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnDestroy(): void {
    this.ingToEditSubscription.unsubscribe();
  }

  ngOnInit() {
    this.ingToEditSubscription = this.shoppingListService.ingToEdit.subscribe(
      (index) => {
        this.editMode = true;
        this.ingToEditIndex = index;
        this.ingToEdit = this.shoppingListService.getIngredient(index);
        this.ingForm.setValue({
          name: this.ingToEdit.name,
          amount: this.ingToEdit.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    // const ingAmount = this.ingAmountRef.nativeElement.value;
    // const ingName = this.ingNameRef.nativeElement.value;
    const ing = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.ingToEditIndex, ing);
    } else {
      this.shoppingListService.addNewIngredient(ing);
    }
    this.editMode = false;
    this.ingForm.reset();
    // this.newIngredient.emit();
  }

  onClear() {
    this.ingForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.ingToEditIndex);
    this.onClear();
  }
}
