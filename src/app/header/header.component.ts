import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureClicked = new EventEmitter();
  // @Output() shoppingListClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onRecipeClicked(feature: string){
    this.featureClicked.emit(feature);
  }

  // noShoppingListClicked(){
  //   this.shoppingListClicked.emit('shoppingList');
  // }

}
