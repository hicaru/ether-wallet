import { Component } from '@angular/core';

import { ModalController } from 'ionic-angular';

import { Wallet } from '../../service/ether/wallet';
import { HomePage } from '../home/home';
import { PagesImportsPage } from '../pages-imports/pages-imports';
import { DetailsPage } from '../details/details';
import { AboutPage } from '../about/about';
import { NetPage } from '../net/net';
import { data } from '../../app/global';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage extends Wallet {

  public networkActive = data.netDefault;

  public pages = {
    home: HomePage,
    impots: PagesImportsPage,
    details: DetailsPage,
    about: AboutPage
  }
  
  public page = this.pages.home;

  constructor(public modalCtrl: ModalController) {
    super();
  }

  public networkModal(): void {
    const networkModal = this.modalCtrl.create(NetPage);
    networkModal.onDidDismiss(provider => {
      if (provider) {
        this.networkActive = provider;
      }
    });
    networkModal.present();
  }

}
