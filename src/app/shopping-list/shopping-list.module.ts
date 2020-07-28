import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ShoppingListComponent }
];

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ShoppingListModule { }
