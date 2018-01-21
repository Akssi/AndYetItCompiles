import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { Category } from '../../common/category';
import { Decision } from '../../common/decision';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  API_URL: string = "http://35.203.69.56/"

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_URL + "categories")
      .pipe(
        catchError(this.handleError('getCategories', []))
      );
  }

  getDecisions(): Observable<Decision[]> {
    return this.http.get<Decision[]>(this.API_URL + "decisions")
      .pipe(
        catchError(this.handleError('getDecisions', []))
      );
  }

}
