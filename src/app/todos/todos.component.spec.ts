import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {Router} from "@angular/router";
import {Todo} from "../models/todo";
import {todoActions} from "../state/todos/todo.actions";

let store: MockStore;
describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent],
      providers: [
        provideMockStore({}),
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    });
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the add screen', () => {
    const router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    component.add();
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });

  it('should dispatch todoActions.updateTodo()', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const dummyTodo = {
      done: false
    } as Todo;
    component.toggleState(dummyTodo);
    expect(dispatchSpy).toHaveBeenCalledWith(
      todoActions.updateTodo({todo: {
        ...dummyTodo,
        done: true
      }})
    );
  });

  it('should dispatch todoActions.deleteTodo()', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.delete(7);
    expect(dispatchSpy).toHaveBeenCalledWith(
      todoActions.deleteTodo({id: 7})
    );
  });
});
