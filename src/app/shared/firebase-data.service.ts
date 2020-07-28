import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }
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
