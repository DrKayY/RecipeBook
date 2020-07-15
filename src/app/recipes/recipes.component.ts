import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  // recipeToDetail: Recipe;
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.recipeService.selectRecipeEvent
    //   .subscribe(
    //     (recipe: Recipe) => {
    //       this.recipeToDetail = recipe;
    //     }
    //   );
    // this.recipeService.selectRecipeEvent
    //   .subscribe(
    //     (recipe: Recipe) => {
    //       const name = recipe.name;
    //       this.router.navigate([name], {relativeTo: this.route});
    //     }
    //   );

  }

}
