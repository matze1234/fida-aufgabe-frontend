import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import {Todo} from "../../../models/todo";

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let dummyTodo: Todo = {
    id: 1,
    dueDate: '2023-06-07T23:32:02.840Z',
    description: 'lsdkjf',
    done: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponent]
    });
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.todo = dummyTodo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
