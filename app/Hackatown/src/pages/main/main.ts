import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { ApiProvider } from '../../providers/api/api';

import { Category } from '../../common/category';

import { Decision } from '../../common/decision';

import { Events } from 'ionic-angular';

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
  decisions: Decision[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider, public events: Events) {	
    events.subscribe('parametersClosed', (categories) => {
    // user and time are the same arguments passed in `events.publish(user, time)`

    console.log('The event parametersClosed was caugh in main.ts, with: ', categories);
    this.getDecisionsByCategories(categories);
  });
  }

  ngOnInit() {
    this.getCategories();
    this.getDecisions();
  }

  getCategories(): void {
    this.apiProvider.getCategories()
      .subscribe(h =>  this.categories = h);
  }

  getDecisions(): void {
    this.apiProvider.getDecisions()
      .subscribe(h =>  this.decisions = h);
  }

  getDecisionsByCategories(categories: Category)
  {
    this.apiProvider.getDecisionsByCategories(categories)
      .subscribe(h =>  this.decisions = h);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }


  handleCardExpansion(event, decision) {
    if (decision.selected === undefined || decision.selected === false) {
      decision.selected = true;
    } else if (decision.selected === true) {
      decision.selected = false;
    }
  }
}
