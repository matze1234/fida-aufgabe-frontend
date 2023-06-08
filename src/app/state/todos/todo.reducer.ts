import { createFeature, createReducer, on } from '@ngrx/store';
import {Todo} from "../../models/todo";
import {todoActions} from "./todo.actions";

interface State {
  todos: Todo[];
  loading: boolean;
}

export const initialState: State = {
  todos: [],
  loading: false,
};

export const todosFeature = createFeature({
  name: 'todos',
  reducer: createReducer(
    initialState,
    on(todoActions.loadTodos, (state) => ({
      ...state,
      loading: true,
    })),
    on(todoActions.loadTodosSuccess, (state, { todos }) => ({
      ...state,
      todos,
      loading: false,
    })),
    on(todoActions.deleteTodoSuccess, (state, { id }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id)
    })),

    on(todoActions.updateTodoSuccess, (state, { todo }) => {
      const nextTodos = [...state.todos];
      const index = nextTodos.findIndex((existingTodo) => existingTodo.id === todo.id);
      if (index < 0) {
        throw new Error(`update in store failed, todo ${todo.id} doesnt exist`);
      }
      nextTodos[index] = todo;

      return {
        ...state,
        todos: nextTodos
      };
    }),

    on(todoActions.createTodoSuccess, (state, { todo }) => {
      const nextTodos = [
        ...state.todos,
        todo
      ];
      return {
        ...state,
        todos: nextTodos
      };
    })
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectTodosState, // feature selector
  selectTodos, // selector for `books` property
  selectLoading, // selector for `loading` property
} = todosFeature;
