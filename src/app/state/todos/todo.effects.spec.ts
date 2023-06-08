import { hot } from 'jasmine-marbles';
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {TestBed} from "@angular/core/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import {TodosEffects} from "./todo.effects";
import {todoActions} from "./todo.actions";
import {TodosService} from "../../services/todo/todos-service";
import {RouterTestingModule} from "@angular/router/testing";
import {Todo} from "../../models/todo";

let actions$: Observable<Action>;
let effects: TodosEffects;

describe('TodoEffects', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])/*StoreModule.forRoot({}),*/],
      providers: [
        TodosEffects,
        provideMockActions(() => actions$),
        { provide: TodosService, useValue: jasmine.createSpyObj('TodoService', ['loadTodos']) },
        // provideMockStore({})
      ],
    });
  });

  it('should load todos and emit success action afterwards', () => {
    effects = TestBed.inject<TodosEffects>(TodosEffects);

    expect(true).toBeTruthy();
    const dummyTodos = [{},{}] as Todo[];
    const todosService = TestBed.inject(TodosService) as jasmine.SpyObj<TodosService>;
    todosService.loadTodos.and.returnValue(of(dummyTodos));

    actions$ = hot('a-|', {
      a: todoActions.loadTodos(),
    });

    const expected = hot('b-|', {b: todoActions.loadTodosSuccess({todos: dummyTodos})});
    expect(effects.loadTodos$).toBeObservable(expected);
  });

});
