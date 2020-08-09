import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../Store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') ingForm: NgForm;
  editMode = false;
  ingToEditIndex: number;
  ingToEdit: Ingredient;
  ingToEditSubscription: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    this.ingToEditSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnInit() {
    this.ingToEditSubscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.ingToEdit = stateData.editedIngredient;
        this.ingForm.setValue({
          name: this.ingToEdit.name,
          amount: this.ingToEdit.amount
        });
      } else {
        this.editMode = false;
      }
    });

  }

  onSubmit(form: NgForm) {
    const ing = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ing));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ing));
    }
    this.editMode = false;
    this.ingForm.reset();
  }

  onClear() {
    this.ingForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
