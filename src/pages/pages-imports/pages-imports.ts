import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import { Wallet } from '../../service/ether/wallet';
// import { Ethereum } from '../../service/interfaces';


@IonicPage()
@Component({
  selector: 'page-pages-imports',
  templateUrl: 'pages-imports.html',
})
export class PagesImportsPage extends Wallet {

  public wallets = [];

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private _storage: Storage) {
    super();
    this.getWallets();
  }

  private async getWallets(): Promise<void> {
    const keys = await this._storage.keys();
    this.wallets = await keys.map(async key => {
      return `${key}: ${await this._storage.get(key)}`;
    });
  }

  public async onPrivateKey(value: string) {
    // let data: Ethereum.IWallet;
    // const alert = {
    //   title: 'error',
    //   subTitle: 'private key fail.',
    //   buttons: ['OK']
    // };
    
    // try {
    //   data = this.walletAddWeb3(value);
    // } catch(err) {
    //   this.alertCtrl.create(alert).present();
    //   return null;
    // }
    
    // const count = await this._storage.keys();
    // let countOfAddress = 1;

    // count.map(key => {
    //   if (!isNaN(+count[key])) {
    //     countOfAddress++;
    //   }
    // });

    // if (data['address']) {
    //   await this._storage.set(`${countOfAddress + 1}`, data['address']);
    //   alert.title = 'imported';
    //   alert.subTitle = data['address'].slice(0, 10) + '...';
    //   this.alertCtrl.create(alert).present();
    // }
  }

  public async test() {
    this._storage.clear();
  }

}
