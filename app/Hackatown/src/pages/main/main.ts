import { Component, OnInit, NgZone } from '@angular/core';
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
  iconMap: Map<String, String>;
  decisions: Observable<Decision[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider, public events: Events, private _ngZone: NgZone) {	
    events.subscribe('parametersClosed', (categories) => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    categories = categories.filter(c => c.selected === undefined || c.selected);

    console.log('The event parametersClosed was caugh in main.ts, with: ', categories);
    this.getDecisionsByCategories(categories);
  });

  }

  ngOnInit() {
    this.getCategories();
    // this.getDecisions();
    this.iconMap = new Map<String, String>();
    this.iconMap.set("Finance", "md-stats");
    this.iconMap.set("Affaires et Industriel", "md-construct");
    this.iconMap.set("Loi et gouvernement", "md-paper");
  }

  obtainIcon(category:String): String
  {
    return this.iconMap.get(category);
  }

  getCategories(): void {
    let outerP = this;
    this.apiProvider.getCategories()
      .subscribe(function(h) {
        this.categories = h; 
        this.decisions = outerP.getDecisionsByCategories(this.categories);
      });
  }

  getDecisions(): void {
    this.decisions = this.apiProvider.getDecisions();
  }

  getDecisionsByCategories(categories: Category[])
  {
    console.log('getDecisionByCat called');
    this._ngZone.run( () => {
      this.decisions = this.apiProvider.getDecisionsByCategories(categories);
    });
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
