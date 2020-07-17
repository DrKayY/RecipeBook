import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

constructor(private http: HttpClient, private recipeService: RecipeService) { }
  // recipes: Recipe[]

  saveData() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-b5dad.firebaseio.com/recipes.json', recipes).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  fetchData() {
    return this.http.get<Recipe[]>('https://recipe-book-b5dad.firebaseio.com/recipes.json').pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }));
  }
}
