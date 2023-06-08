import {ErrorHandler, Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor(private router: Router) { }

  handleError(error: any) {
    this.router.navigate(['/error']);
  }
}
