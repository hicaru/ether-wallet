import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Wallet } from '../../service/ether/wallet';
import { Repository } from '../../service/local/storage';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage extends Wallet {

  public isExisting = this.repo.isNotVirgin();

  private loader = this.loadingCtrl.create({
    content: "Please wait..."
  });

  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private repo: Repository,
              public navCtrl: NavController,
              public navParams: NavParams) {
    super();
    // this.navCtrl.setRoot(MenuPage);
    // this.repo.onClear();
  }

  public async signUp(pass0: string, pass1: string): Promise<void> {
    let alert = {
      title: null,
      subTitle: null,
      buttons: ['OK']
    };

    if (pass0 !== pass1) {
      alert.title = 'password';
      alert.subTitle = 'Enter the password again';
      this.alertCtrl.create(alert).present();
      return null;
    }
    if (pass0.length < 3) {
      alert.title = 'password';
      alert.subTitle = 'weak password';
      this.alertCtrl.create(alert).present();
      return null;
    }

    await this.loader.present();

    const entropy = this.utils.randomHex(16);
    this.createTenWallets(entropy);
    this.repo.onWriteEntropy(entropy);
    await this.repo.onWriteWalletObjec(pass0);
    this.navCtrl.setRoot(MenuPage);
    await this.loader.dismiss();
  }

  public async signIn(value: string): Promise<void> {
    await this.loader.present();

    let alert = {
      title: 'message',
      subTitle: 'Incorrect password',
      buttons: ['OK']
    };

    try {
      await this.repo.onGetWalletsDecrypt(value);
    } catch(err) {
      this.alertCtrl.create(alert).present();
      return null;
    }

    this.navCtrl.setRoot(MenuPage);
    await this.loader.dismiss();
  }

}
