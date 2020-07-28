import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: AuthComponent }
];

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
