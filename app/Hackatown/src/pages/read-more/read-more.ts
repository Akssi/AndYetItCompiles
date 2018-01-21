import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Decision } from '../../common/decision';

/**
 * Generated class for the ReadMorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-read-more',
  templateUrl: 'read-more.html',
})
export class ReadMorePage {

  decision: Decision;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.decision = navParams.get("EZ");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadMorePage');
  }

}
