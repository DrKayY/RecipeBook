import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FirebaseDataService } from '../recipes/shared/firebase-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Output() featureClicked = new EventEmitter();
  // @Output() shoppingListClicked = new EventEmitter();

  constructor(private firebaseDataService: FirebaseDataService) { }

  ngOnInit() {
  }

  // onRecipeClicked(feature: string){
  //   this.featureClicked.emit(feature);
  // }

  // noShoppingListClicked(){
  //   this.shoppingListClicked.emit('shoppingList');
  // }

  onSaveData() {
    this.firebaseDataService.saveData();
  }

  onFetchData() {
    this.firebaseDataService.fetchData().subscribe();
  }
}
