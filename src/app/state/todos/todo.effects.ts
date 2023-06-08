import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {first, from, tap} from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';
import {todoActions} from "./todo.actions";
import {TodosService} from "../../services/todo/todos-service";
import {Router} from "@angular/router";

@Injectable()
export class TodosEffects {

  loadTodos$ = createEffect(() => this.actions$.pipe(
      ofType(todoActions.loadTodos),
      exhaustMap(() => this.todosService.loadTodos()
        .pipe(
          first(),
          // delay(2000), // delay is just for demonstration purposes
          map((todos) => todoActions.loadTodosSuccess({ todos })),
        )
    ))
  );

  deleteTodo$ = createEffect(() => this.actions$.pipe(
      ofType(todoActions.deleteTodo),
      exhaustMap(({ id }) => from(this.todosService.deleteTodo(id))
        .pipe(
          map(() => todoActions.deleteTodoSuccess({ id })),
        ))
    )
  );

  updateTodo$ = createEffect(() => this.actions$.pipe(
      ofType(todoActions.updateTodo),
      exhaustMap(({ todo }) => from(this.todosService.updateTodo(todo))
        .pipe(
          map(() => todoActions.updateTodoSuccess({ todo })),
        ))
    )
  );

  createTodo$ = createEffect(() => this.actions$.pipe(
      ofType(todoActions.createTodo),
      exhaustMap(({ description, dueDate }) => from(this.todosService.createTodo(description, dueDate))
        .pipe(
          map((todo) => todoActions.createTodoSuccess({ todo })),
        ))
    )
  );

  createTodoSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(todoActions.createTodoSuccess),
      tap(() => this.router.navigate(['/']))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private todosService: TodosService,
    private router: Router
  ) {}
}
