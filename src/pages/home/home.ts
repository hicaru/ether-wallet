import { Component } from '@angular/core';

import { ModalController } from 'ionic-angular';

import { Wallet } from '../../service/ether/wallet';
import { data } from '../../app/global';
import { Repositories } from '../../service/interfaces';
import { SendPage } from '../send/send';
import { Repository } from '../../service/local/storage';


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
    this.repo.activeAccountSet(value);
    this.onBalance();
  }
  public balance: number;

  constructor(private repo: Repository,
              public modalCtrl: ModalController) {
    super();
    this.onBalance();
  }

  public onBalance(): number {
    /**
     * @method: Balance of address update.
     */
    const address = <Repositories.IWallet>this.wallets[data.activeAddress];
    const balance = this.eth.getBalance(address.address);

    this.balance = this.utils.fromWei(`${balance}`, 'ether');
    return this.balance;
  }

  presentProfileModal() {
    const profileModal = this.modalCtrl.create(SendPage);
    profileModal.present();
  }

}
