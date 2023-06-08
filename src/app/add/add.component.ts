import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {todoActions} from "../state/todos/todo.actions";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class  AddComponent {
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

