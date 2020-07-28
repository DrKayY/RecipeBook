import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Recipe } from './recipe.model';
import { FirebaseDataService } from '../shared/firebase-data.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

constructor(private firebaseDataService: FirebaseDataService, private recipeService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.recipeService.getRecipes().length === 0) {
      return this.firebaseDataService.fetchData();
    } else {
      return this.recipeService.getRecipes();
    }
  }

}
