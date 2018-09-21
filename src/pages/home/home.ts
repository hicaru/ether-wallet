import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { Wallet } from '../../service/ether/wallet';
import { data } from '../../app/global';
import { Repositories } from '../../service/interfaces';
import { SendPage } from '../send/send';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends Wallet {

  public get wallets(): Repositories.IWallet[] {
    return data.wallet;
  }
  public get isNumberOfAddress(): number {
    return data.activeAddress;
  }
  public set isNumberOfAddress(value: number) {
    data.activeAddress = value;
    this.onBalance();
  }
  public balance: number;
  public blockNumber: Promise<number> = this.eth.getBlockNumber();

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController) {
    super();
    this.onBalance();
  }

  public async onBalance(): Promise<void> {
    /**
     * @method: Balance of address update.
     */
    const address = <Repositories.IWallet>this.wallets[data.activeAddress];
    const balance = await this.eth.getBalance(address.address);

    this.balance = this.utils.fromWei(balance, 'ether');
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(SendPage, { userId: 8675309 });
    profileModal.present();
  }

}
