import { Component, OnInit, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { ApiProvider } from '../../providers/api/api';

import { Category } from '../../common/category';
import { Arrondissement } from '../../common/arrondissement';

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
    events.subscribe('parametersClosed', (array) => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    let categories = array[0].filter(c => c.selected === undefined || c.selected);
    let arrondissements = array[1].filter(c => c.selected === undefined || c.selected);

    console.log('The event parametersClosed was caugh in main.ts, with: ', categories);
    this.getDecisionsByCategories(categories, arrondissements);
  });

  }

  ngOnInit() {
    this.getCategories();
    // this.getDecisions();
    this.iconMap = new Map<String, String>();
    this.iconMap.set("Finance", "md-stats");
    this.iconMap.set("Affaires et Industriel", "md-construct");
    this.iconMap.set("Loi et gouvernement", "md-paper");
    this.iconMap.set("Arts et divertissements", "md-color-palette");    
    this.iconMap.set("Immobilier", "md-home");
    this.iconMap.set("Références", "md-reorder");
    this.iconMap.set("Maison et jardin", "md-home");    
    this.iconMap.set("Loisirs", "md-football");
    this.iconMap.set("Voyage", "md-plane");
    this.iconMap.set("Santé", "md-medkit");
    this.iconMap.set("Sports", "md-basketball");
    this.iconMap.set("Animaux", "md-paw");
    this.iconMap.set("Science", "md-flask");
    this.iconMap.set("Informatique et électronique", "md-at");
  }

  obtainIcon(category:String): String
  {
    let icon = this.iconMap.get(category);
    if(icon === undefined)
    {
      icon = "md-alert";
    }
    return icon;
  }

  getCategories(): void {
    let outerP = this;
    this.apiProvider.getCategories()
      .subscribe(function(h) {
        this.categories = h; 
        this.decisions = outerP.getDecisionsByCategories(this.categories, []);
      });
  }

  getDecisions(): void {
    this.decisions = this.apiProvider.getDecisions();
  }

  getDecisionsByCategories(categories: Category[], arrondissements: Arrondissement[])
  {
    console.log('getDecisionByCat called');
    this._ngZone.run( () => {
      this.decisions = this.apiProvider.getDecisionsByCategories(categories, arrondissements);
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

  handleReadMoreClicked(decision) {    
      this.events.publish('readMoreClicked', decision);
  }
}
