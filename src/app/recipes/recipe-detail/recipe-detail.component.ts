import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shoppingList.service';
import { Ingredient } from '../shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
              private recipesService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        // tslint:disable-next-line: no-string-literal
        // this.recipe = this.recipesService.getRecipe(+params['id']);
        this.id = +params.id;
        this.recipe = this.recipesService.getRecipe(+params.id);
        // tslint:disable-next-line: no-string-literal
        // this.id = +params['id'];
      }
    );
  }

  toEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  toDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngsToShoppingList(ingredients);
  }
}
