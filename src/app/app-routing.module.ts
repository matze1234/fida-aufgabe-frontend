import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodosComponent} from "./screens/todos/todos.component";
import {AddTodoComponent} from "./screens/add-todo/add-todo.component";
import {ErrorComponent} from "./error/error.component";

const routes: Routes = [{
  path: '',
  component: TodosComponent
}, {
  path: 'add',
  component: AddTodoComponent
}, {
  path: 'error',
  component: ErrorComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
