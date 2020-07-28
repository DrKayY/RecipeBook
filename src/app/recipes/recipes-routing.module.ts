import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuardGuard } from '../auth/auth-guard.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { CanComponentDeactivateGuard } from '../_services/can-component-deactivate.guard';

const routes: Routes = [
  { path: '', component: RecipesComponent,
    canActivate: [AuthGuardGuard],
    children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent, canDeactivate: [CanComponentDeactivateGuard] },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService], canDeactivate: [CanComponentDeactivateGuard] }
    ] },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule { }
