import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { MainPage } from '../pages/main/main';
import { PopoverPage } from '../pages/popover/popover';

import { ApiProvider } from '../providers/api/api';

import { Category } from '../common/category';

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

  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.apiProvider.getCategories()
      .subscribe(h =>  this.categories = h);
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
      this.events.publish('parametersClosed', this.categories);
  }

  handleCategoryToggle(category: Category) {
    if (category.selected === undefined || category.selected === false) {
      category.selected = true;
    } else if (category.selected === true) {
      category.selected = false;
    }
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
