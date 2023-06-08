import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Todo} from "../../models/todo";

export const todoActions = createActionGroup({
  source: 'Todo',
  events: {
    loadTodos: emptyProps(),
    loadTodosSuccess: props<{ todos: Todo[] }>(),

    deleteTodo: props<{ id: number }>(),
    deleteTodoSuccess: props<{ id: number }>(),

    updateTodo: props<{ todo: Todo }>(),
    updateTodoSuccess: props<{ todo: Todo }>(),

    createTodo: props<{ description: string; dueDate: string; }>(),
    createTodoSuccess: props<{ todo: Todo }>(),
  },
});
