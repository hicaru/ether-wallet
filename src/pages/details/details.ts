import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { AlertController } from 'ionic-angular';

import EthereumQRPlugin from 'ethereum-qr-code';

import { data } from '../../app/global';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  public numberOfAccaunt = data.activeAddress;
  public address = data.wallet[data.activeAddress].address;
  public qrCodeString: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private clipboard: Clipboard,
              private alertCtrl: AlertController) {
    this.qrcode().then(str => {
      this.qrCodeString = str;
    });
  }

  public async qrcode() {
    const qr = new EthereumQRPlugin();
    const address = this.address;
    const qrCode = qr.toDataUrl({
      to: address
    });
    const base64 = await qrCode;

    return base64.dataURL;
  }

  public copyAddress() {
    const alert = this.alertCtrl.create({
      title: 'Copied',
      subTitle: this.address.slice(0, 9) + '...',
      buttons: ['OK']
    });
    this.clipboard.copy(this.address);
    alert.present();
  }  

}
