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
    let icon = this.iconMap.get(category);
    if(icon === undefined)
    {
      icon = "md-alert";
    }
    return icon;
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
