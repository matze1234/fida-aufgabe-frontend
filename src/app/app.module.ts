import {NgModule, APP_INITIALIZER, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Store, StoreModule} from '@ngrx/store';
import {LocalStorageTodosService} from "./services/todo/local-storage.todos.service";
import {TodosService} from "./services/todo/todos-service";
import {todosFeature} from "./state/todos/todo.reducer";
import { TodosComponent } from './todos/todos.component';
import { AddComponent } from './add/add.component';
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TodosEffects} from "./state/todos/todo.effects";
import {EffectsModule} from "@ngrx/effects";
import {todoActions} from "./state/todos/todo.actions";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatChipsModule} from "@angular/material/chips";
import { TodoComponent } from './todos/todo/todo.component';
import {MatButtonModule} from "@angular/material/button";
import {ErrorHandlerService} from "./services/error-handler/error-handler.service";
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    AddComponent,
    TodoComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({[todosFeature.name]: todosFeature.reducer}),
    EffectsModule.forRoot([TodosEffects]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatButtonModule
  ],
  providers: [{
    provide: TodosService, useClass: LocalStorageTodosService
  }, {
    provide: APP_INITIALIZER,
    useFactory: (store: Store) => {
      return () => {
        store.dispatch(
          todoActions.loadTodos()
        );
      };
    },
    multi: true,
    deps: [Store]
  }, {
    provide: ErrorHandler,
    useClass: ErrorHandlerService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
