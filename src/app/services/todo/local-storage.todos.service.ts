import { Injectable } from '@angular/core';
import {Todo} from "../../models/todo";
import {TodosService} from "./todos-service";
import {Observable, of} from "rxjs";

@Injectable()
export class LocalStorageTodosService extends TodosService {

  loadTodos(): Observable<Todo[]> {
    const todos = LocalStorageTodosService.readTodos();
    return of(todos);
  }
  async updateTodo(todo: Todo): Promise<void> {
    const currentTodos = LocalStorageTodosService.readTodos();
    const nextTodos = [
      ...currentTodos
    ];
    const index = nextTodos.findIndex((existingTodo) => existingTodo.id === todo.id);
    if (index < 0) {
      throw new Error(`update in local storage failed, todo ${todo.id} doesnt exist`);
    }

    nextTodos[index] = todo;
    const nextTodosStr = JSON.stringify(nextTodos);
    localStorage.setItem('todos', nextTodosStr);
  }

  async createTodo(description: string, dueDate: string): Promise<Todo> {
    const currentTodos = LocalStorageTodosService.readTodos();

    const newId = LocalStorageTodosService.generateNextId(currentTodos);
    const newTodo: Todo = {
      id: newId,
      description,
      dueDate,
      done: false
    };

    const nextTodos = [
      ...currentTodos,
      newTodo
    ];
    const nextTodosStr = JSON.stringify(nextTodos);
    localStorage.setItem('todos', nextTodosStr);
    return newTodo;
  }

  async deleteTodo(id: number): Promise<void> {
    const currentTodos = LocalStorageTodosService.readTodos();
    const nextTodos = currentTodos.filter((existingTodo) => existingTodo.id !== id);
    const nextTodosStr = JSON.stringify(nextTodos);
    localStorage.setItem('todos', nextTodosStr);
  }

  private static generateNextId(todos: Todo[]): number {
    const ids = todos.map((todo) => todo.id);
    return ids.length ?
      Math.max(...ids) + 1 :
      0;
  }

  private static readTodos(): Todo[] {
    const todosStr = localStorage.getItem('todos');
    const todos: Todo[] = todosStr && JSON.parse(todosStr);
    return todos || [];
  }

}
