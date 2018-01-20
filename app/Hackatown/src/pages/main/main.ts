import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { ApiProvider } from '../../providers/api/api';

import { Category } from '../../common/category.ts';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage implements OnInit {

  categories: Category[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    console.log("loaded");
    this.apiProvider.getCategories()
      .subscribe(h =>  this.categories = h);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}
