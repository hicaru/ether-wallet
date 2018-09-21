import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../service/ether/wallet';
import { data } from '../../app/global';
/**
 * Generated class for the SendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface ITxData {
  to: string;
  value: number | string;
  gasPrice: number | string;
  gasLimit: number | string;
  data?: number | string;
}

@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage extends Wallet {

  private address: string = data.wallet[data.activeAddress].address;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    super();
  }

  public async txSend(txData: ITxData) {
    const nonce = await this.eth.getTransactionCount(this.address);

    const data = {
        nonce: nonce,
        from: this.address,
        to: txData.to,
        gasLimit: txData.gasLimit,
        gasPrice: this.utils.toWei(txData.gasPrice.toString(), 'Gwei'),
        value: this.utils.toWei(txData.value.toString(), 'ether')
    };
    console.log(this.eth.wallet);
    // this.eth.sendTransaction(data, (err, hash) => {
    //   if (hash) {
    //     console.log(hash);
    //     return hash
    //   } else {
    //     console.error(err);
    //     return err;
    //   }
    // }).then(console.log).catch(console.log);

  }

}
