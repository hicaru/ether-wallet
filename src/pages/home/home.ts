import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Wallet } from '../../service/ether/wallet';
import { data } from '../../app/global';
import { Repositories } from '../../service/interfaces';


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

  constructor(public navCtrl: NavController) {
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

}
