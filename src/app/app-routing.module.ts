import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodosComponent} from "./todos/todos.component";
import {AddComponent} from "./add/add.component";
import {ErrorComponent} from "./error/error.component";

const routes: Routes = [{
  path: '',
  component: TodosComponent
}, {
  path: 'add',
  component: AddComponent
}, {
  path: 'error',
  component: ErrorComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
