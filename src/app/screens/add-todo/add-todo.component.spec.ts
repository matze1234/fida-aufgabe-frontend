import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {todoActions} from "../../state/todos/todo.actions";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

let store: MockStore;

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTodoComponent],
      providers: [
        provideMockStore({})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch todoActions.createTodo()', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough(); // spy on the store

    const description = 'asfd';
    const dueDate = '2023-06-07T23:32:02.840Z';
    component.todoForm.setValue({description, dueDate});
    component.submit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      todoActions.createTodo({description, dueDate})
    );
  });
});
