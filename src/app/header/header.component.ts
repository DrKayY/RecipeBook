import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FirebaseDataService } from '../shared/firebase-data.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featureClicked = new EventEmitter();
  // @Output() shoppingListClicked = new EventEmitter();
  isAuthenticated = false;
  userSubs: Subscription;

  constructor(private firebaseDataService: FirebaseDataService, private authService: AuthService) { }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  ngOnInit() {
    this.userSubs = this.authService.user.subscribe(userData => {
      this.isAuthenticated = !!userData;
    });
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

  onLogout() {
    this.authService.logout();
  }
}
