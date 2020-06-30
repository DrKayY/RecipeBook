import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test Recipe1', 'Description1', 'https://c.pxhere.com/images/15/3d/9ee477ee62341b9480ce314b02f8-1417897.jpg!d'),
    new Recipe('Test Recipe2', 'Description2', 'https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg')
  ];
  @Output() recipeToDetailEvent = new EventEmitter();
  recipeToDetail: Recipe;
  constructor() { }

  ngOnInit() {
  }

  onRecipeFromItemEvent(recipeInput: Recipe) {
    this.recipeToDetail = recipeInput;
    this.recipeToDetailEvent.emit(this.recipeToDetail);
  }
}
