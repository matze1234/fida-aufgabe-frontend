import {Todo} from "../../models/todo";
import {Observable} from "rxjs";

export abstract class TodosService {
  abstract loadTodos(): Observable<Todo[]>;
  abstract updateTodo(todo: Todo): Promise<void>;
  abstract createTodo(description: string, dueDate: string): Promise<Todo>;
  abstract deleteTodo(id: number): Promise<void>;
}
