import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import * as fromApp from './Store/app.reducer';
import { AuthEffects } from './auth/Store/auth.effects';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      ProjectFormComponent,
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      StoreModule.forRoot(fromApp.appReducer),
      EffectsModule.forRoot([AuthEffects]),
      AppRoutingModule,
      SharedModule,
      CoreModule
   ],
   providers: [
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
