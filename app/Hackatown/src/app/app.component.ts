import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { MainPage } from '../pages/main/main';

import { ReadMorePage } from '../pages/read-more/read-more';

import { ApiProvider } from '../providers/api/api';

import { Category } from '../common/category';
import { Arrondissement } from '../common/arrondissement';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = MainPage;
  pages: Array<{title: string, component: any}>;
  categories: Category[];
  arrondissements: Arrondissement[];
  iconMap: Map<String, String>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private apiProvider: ApiProvider,
    public events: Events
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Main Page', component: MainPage }
    ];
    events.subscribe('readMoreClicked', (decision) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log("readMore was clicked, we have to display another page");
      this.nav.push(ReadMorePage, {EZ: decision});
    });
  }

  ngOnInit() {
    this.getCategories();
    this.getArrondissements();

    this.iconMap = new Map<String, String>();
    this.iconMap.set("Finance", "md-stats");
    this.iconMap.set("Affaires et Industriel", "md-construct");
    this.iconMap.set("Loi et gouvernement", "md-paper");
    this.iconMap.set("Art", "md-color-palette");    
    this.iconMap.set("Infrastructure", "md-home");
    this.iconMap.set("Politique", "md-school");
    this.iconMap.set("Construction", "md-home");    
    this.iconMap.set("Loisir", "md-football");
    this.iconMap.set("Voyage", "md-plane");
  }

  getCategories(): void {
    this.apiProvider.getCategories()
      .subscribe(h =>  this.categories = h);
  }

  getArrondissements(): void {
    this.apiProvider.getArrondissements()
      .subscribe(h =>  this.arrondissements = h);
  }

  obtainIcon(category:String): String
  {
    return this.iconMap.get(category);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    
  }

  handleMenuClose()  {
      console.log("app.component.ts.handleMenuClose was called");
      this.events.publish('parametersClosed', [this.categories, this.arrondissements]);
  }

  handleCategoryToggle(category) {
    if (category.selected === false) {
      category.selected = true;
    } else if (category.selected === undefined || category.selected === true) {
      category.selected = false;
    }
  }

  handleArrondissementToggle(arrondissement) {
    if (arrondissement.selected === false) {
      arrondissement.selected = true;
    } else if (arrondissement.selected === undefined || arrondissement.selected === true) {
      arrondissement.selected = false;
    }
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
