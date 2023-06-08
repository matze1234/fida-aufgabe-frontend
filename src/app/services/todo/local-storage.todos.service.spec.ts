import { TestBed } from '@angular/core/testing';
import {LocalStorageTodosService} from "./local-storage.todos.service";
import {TodosService} from "./todos-service";
import {Todo} from "../../models/todo";
import {firstValueFrom} from "rxjs";

let localStore: any;
describe('ErrorHandlerService', () => {
  let service: LocalStorageTodosService;

  beforeEach(() => {
    localStore = {};
    spyOn(Storage.prototype, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(Storage.prototype, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );

    TestBed.configureTestingModule({
      providers: [{provide: TodosService, useClass: LocalStorageTodosService}]
    });
    service = TestBed.inject(TodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load todos from local storage', async () => {
    const dummyTodos = [{
      done: true,
      description: 'saodifj'
    }] as Todo[];
    localStore['todos'] = JSON.stringify(dummyTodos);
    const todos = await firstValueFrom(service.loadTodos());
    expect(todos).toEqual(dummyTodos);

  });

  it('should update todo in local storage', async () => {
    const dummyTodo = {id: 1, done: false} as Todo;
    localStore['todos'] = JSON.stringify(
      [dummyTodo]
    );
    dummyTodo.done = true;
    await service.updateTodo(dummyTodo);
    const todos = JSON.parse(localStore['todos']);
    expect(todos[0].done).toEqual(true);
  });

  it('should create todo in local storage', async () => {
    const dummyTodo = {id: 1, done: false} as Todo;
    localStore['todos'] = JSON.stringify(
      [dummyTodo]
    );

    const description = 'abc';
    const dueDate = '2023-06-07T23:32:02.840Z';
    await service.createTodo(description, dueDate);
    const todos = JSON.parse(localStore['todos']);
    expect(todos[1]).toEqual({
      description,
      dueDate,
      done: false,
      id: 2
    });
  });

  it('should delete todo in local storage', async () => {
    const dummyTodos = [
      {id: 1, done: false},
      {id: 2, done: false},
    ] as Todo[];
    localStore['todos'] = JSON.stringify(
      dummyTodos
    );
    await service.deleteTodo(1);
    const todos = JSON.parse(localStore['todos']);
    expect(todos.length).toBe(1);
    expect(todos[0].id).toBe(2);
  });
});
