import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../service/ether/wallet';
import { HomePage } from '../home/home';
import { PagesImportsPage } from '../pages-imports/pages-imports';
import { DetailsPage } from '../details/details';
import { AboutPage } from '../about/about';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage extends Wallet {

  public pages = {
    home: HomePage,
    impots: PagesImportsPage,
    details: DetailsPage,
    about: AboutPage
  }
  
  public page = this.pages.home;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    super();
    // this.net().then(console.log);
  }

}
