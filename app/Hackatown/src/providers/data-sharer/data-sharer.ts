import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Category } from '../../common/category';
import { Decision } from '../../common/decision';
/*
  Generated class for the DataSharerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataSharerProvider {


  categories: Category[];
  decisions: Decision[];

  constructor(public http: HttpClient) {
    console.log('Hello DataSharerProvider Provider');
  }

  getCategories(): Observable<Category[]> {
    return this.categories;
  }

}
