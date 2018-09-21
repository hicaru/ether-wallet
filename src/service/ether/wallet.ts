import * as Web3 from 'web3';
import { config } from './config';
import { Ethereum } from '../interfaces';

const web3 = new Web3(config.PROVIDER);

export class Wallet {

  private _web3 = web3;

  public version = this._web3.version;
  public utils = this._web3.utils;
  public eth = this._web3.eth;
  public net: Promise<string> = this.eth.net.getId().then(id => {
    switch (id) {
      case 1: return 'main';
      case 3: return 'ropsten';
      case 42: return 'kovan';
      case 4: return 'rinkeby';
      default: return null;
    }
  });

  constructor() {}

  public walletAddWeb3(privateKey: string): Ethereum.IWallet {
    return this._web3.eth.accounts.wallet.add(privateKey);
  }

  protected createTenWallets(entropy: string): Ethereum.IWallet[] {
    return this._web3.eth.accounts.wallet.create(5 ,entropy);
  }

}
