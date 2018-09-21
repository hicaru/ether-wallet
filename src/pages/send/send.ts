import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    super();
  }

  public async txSend(txData: Ethereum.ITxData) {
    await this.walletAddWeb3(this.privateKey);
    const nonce = await this.eth.getTransactionCount(this.address);

    const data = {
        nonce: nonce,
        from: this.address,
        to: txData.to,
        gasLimit: txData.gasLimit,
        gasPrice: this.utils.toWei(txData.gasPrice.toString(), 'Gwei'),
        value: this.utils.toWei(txData.value.toString(), 'ether')
    };

    // this.eth.sendTransaction(data).then(console.log).catch(console.log);
  }

  public async qrcode(txData: Ethereum.ITxData): Promise<string> {
    const qr = new EthereumQRPlugin();
    const data = {
      from: this.address,
      to: txData.to,
      value: this.utils.toWei(txData.value.toString(), 'ether')
    };
    const qrCode = qr.toDataUrl(data);
    const base64 = await qrCode;
    this.qrCodeString = base64.dataURL;
    return this.qrCodeString;
  }

}
