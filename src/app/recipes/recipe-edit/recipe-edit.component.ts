import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { CanComponentDeactivateGuard } from 'src/app/_services/can-component-deactivate.guard';
import * as fromApp from '../../Store/app.reducer';
import * as RecipesActions from '../store/recipes.action';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, CanComponentDeactivateGuard, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  changesSaved = false;
  formArrayLength: number;
  storeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initForm();
        this.formArrayLength = (this.recipeForm.get('ingredients') as FormArray).length;
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // tslint:disable-next-line: prefer-const
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSubscription = this.store.select('recipes').pipe(
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        }))
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe.ingredients) {
            // tslint:disable-next-line: prefer-const
            for (let ing of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ing.name, Validators.required),
                  amount: new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new RecipesActions.UpdateRecipe({ id: this.id, newRecipe: this.recipeForm.value }));
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
}

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredients() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onRemoveIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const formArrayLength = (this.recipeForm.get('ingredients') as FormArray).length;
    if ((this.recipeForm.dirty || formArrayLength !== this.formArrayLength) && !this.changesSaved) {
      return confirm('There are unsaved changes, are you sure you are done?');
    } else {
      return true;
    }
  }
}
