import { Component } from '@angular/core';

import { AlertController, ViewController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

import EthereumQRPlugin from 'ethereum-qr-code';

import { Wallet } from '../../service/ether/wallet';
import { data } from '../../app/global';
import { Ethereum } from '../../service/interfaces';
/**
 * Generated class for the SendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage extends Wallet {

  public qrCodeString: string;
  private address: string = data.wallet[data.activeAddress].address;
  private privateKey = data.wallet[data.activeAddress].privateKey;

  constructor(private alertCtrl: AlertController,
              private clipboard: Clipboard,
              public viewCtrl: ViewController) {
    super();
  }

  public async txSend(txData: Ethereum.ITxData) {
    const nonce = await this.eth.getTransactionCount(this.address);

    try {
      const data = {
        nonce: nonce,
        to: txData.to,
        from: `${this.address}`,
        gasLimit: +txData.gasLimit,
        gasPrice: +this.utils.toWei(txData.gasPrice.toString(), 'Gwei'),
        value: +this.utils.toWei(txData.value.toString(), 'ether')
      };
      const hash = await this.sendTransaction(data, this.privateKey);
      this.alertCtrl.create({
        title: 'Transaction',
        subTitle: 'hash created and copied to clipboard.',
        buttons: ['OK']
      }).present();
      this.clipboard.copy(hash);
      return hash;
    } catch(err) {
      this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['OK']
      }).present();
      return null;
    }
  }

  public async qrcode(txData: Ethereum.ITxData): Promise<string> {
    const qr = new EthereumQRPlugin();

    try {
      const data = {
        from: this.address,
        to: txData.to,
        value: this.utils.toWei(txData.value.toString(), 'ether')
      };
  
      const base64 = await qr.toDataUrl(data);
      this.qrCodeString = base64.dataURL;
      return this.qrCodeString;
    } catch(err) {
      this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Transaction data error',
        buttons: ['OK']
      }).present();
      return null;
    }
  }

}
