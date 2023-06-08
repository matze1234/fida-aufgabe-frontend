import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "../models/todo";
import {Store} from "@ngrx/store";
import {todosFeature} from "../state/todos/todo.reducer";
import {Router} from "@angular/router";
import {todoActions} from "../state/todos/todo.actions";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;

  constructor(private readonly store: Store, private router: Router) {
    this.todos$ = this.store.select(todosFeature.selectTodos);
    this.loading$ = this.store.select(todosFeature.selectLoading);
  }

  add() {
    this.router.navigate(['add']);
  }
  toggleState(todo: Todo) {
    todo = {
      ...todo,
      done: !todo.done
    };
    this.store.dispatch(
      todoActions.updateTodo({ todo })
    );
  }

  delete(id: number) {
    this.store.dispatch(
      todoActions.deleteTodo({ id })
    );
  }
}

