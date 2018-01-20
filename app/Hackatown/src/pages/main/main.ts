import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { ApiProvider } from '../../providers/api/api';

import { Category } from '../../common/category';

import { Decision } from '../../app/decision';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider) {	
  }

  ngOnInit() {
    this.getCategories();
    this.initializePage();
  }

  getCategories(): void {
    console.log("loaded");
    this.apiProvider.getCategories()
      .subscribe(h =>  this.categories = h);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

	initializePage() {
		console.log("initialze main page");
		this.populateDecisions();
		
	}

	// POPULATE DECISIONS
  populateDecisions() {
    let categories1: string[] = new Array("transport", "economie"); 
    let categories2: string[] = new Array("transport", "societe"); 
    let decision1: Decision = {
      id :"dsa12",
      title : "ceci est une premiere decision",
      content : "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
      categories : categories1 
    };
    let decision2: Decision = {
      id :"322",
      title : "ceci est une deuxieme decision",
      content : "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
      categories : categories2
    };
    this.decisions = new Array(decision1, decision2);
    console.log("STUFF");
    console.log(this.decisions[0].id);
   // this.decisions.push(decision1);
   // this.decisions.push(decision2);
  }
}
