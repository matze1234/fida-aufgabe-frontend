import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from "../../../models/todo";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  @Input()
  todo!: Todo;

  @Output()
  delete = new EventEmitter<void>;
}
