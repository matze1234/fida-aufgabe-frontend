import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {todoActions} from "../../state/todos/todo.actions";

@Component({
  selector: 'app-add',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  todoForm = new FormGroup({
    description: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private readonly store: Store) {
  }

  submit() {
    const description = this.todoForm.value.description as string;
    const dueDate = new Date(this.todoForm.value.dueDate as string).toISOString();

    this.store.dispatch(
      todoActions.createTodo({description, dueDate})
    );
  }
}

