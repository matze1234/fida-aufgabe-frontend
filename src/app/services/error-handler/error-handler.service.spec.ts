import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler.service';
import {Router} from "@angular/router";

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerService,
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to error screen', () => {
    const router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    service.handleError({});
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });
});
