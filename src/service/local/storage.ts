import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Wallet } from '../ether/wallet';
import { data } from '../../app/global';
import { Repositories } from '../interfaces';
import { config } from '../ether/config';


@Injectable()
export class Repository extends Wallet {

  constructor(private _storage: Storage) {
    super();
  }

  // methods. //
  public async onWriteWalletObjec(password: string): Promise<Repositories.IWallet[]> {
    /**
     * @method: Writes to the database json strign.
     * @param {wallets}: Is array ethereum addresses.
     */
    const encryptWallets = this.accounts.wallet.encrypt(password);
    await this._storage.set('wallet', JSON.stringify(encryptWallets));
    
    return this.walletToRepoWallet();
  }
  public async onGetWalletsDecrypt(password: string): Promise<Repositories.IWallet[]> {
    const encryptWallet = await this.onGetWalletsEncrypt();
    this.accounts.wallet.decrypt(encryptWallet, password);
    return this.walletToRepoWallet();
  }
  public async onGetWalletsEncrypt(): Promise<object[]> {
    const wallets = await this._storage.get('wallet');
    return JSON.parse(wallets);
  }
  public async activeAccountGet(): Promise<number> {
    const active = await this._storage.get('active');
    data.activeAddress = +active || 0;
    
    return data.activeAddress;
  }
  public async isNotVirgin(): Promise<boolean> {
    /**
     * @method: Checking your account for virginity.
     */
    let valid: number;
    try {
      valid = await this._storage.length();
    } catch(err) {
      return false;
    }

    return !!valid;
  }
  public async setNet(prodvider: string) {
    return this._storage.set('net', prodvider);
  }
  public async getNet() {
    const net = await this._storage.get('net');
    return net || Object.keys(config)[0];
  }
  // public async createDefaultNet(): Promise<string> {
  //   const nets = JSON.stringify(config);
  //   return this._storage.set('net', nets);
  // }
  // public async onGetNetsObject() {
  //   const nets = await this._storage.get('net');
  //   return JSON.parse(nets);
  // }

  public walletToRepoWallet(): Repositories.IWallet[] {
    const wallet =  this.accounts.wallet;
    let wallets: Repositories.IWallet[] = [];

    Object.keys(wallet).forEach(key => {
      if (!isNaN(+key) && !this.utils.isAddress(key)) {
        wallets.push(<Repositories.IWallet>{
          address: wallet[key].address,
          privateKey: wallet[key].privateKey
        });
      }
    });

    data.wallet = wallets;
    return data.wallet;
  }
  public onWriteEntropy(entropy: string): Promise<string | any> {
    /**
     * @param {entropy}: Save the entropy string, for unlock.
     */
    return this._storage.set('entropy', entropy);
  }
  public onGetEntropy(): Promise<string> {
    /**
     * @method: Get decrypt entropy string.
     * @param {password}: User password string.
     */
    return this._storage.get('entropy');
  }
  public activeAccountSet(id: number = 0): Promise<string | number> {
    data.activeAddress = id;
    return this._storage.set('active', `${id}`);
  }
  public onClear(): void {
    this._storage.clear();
  }
}