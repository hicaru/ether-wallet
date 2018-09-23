import Web3 from 'web3';
import Tx from 'ethereumjs-tx';
import { config } from './config';
import { Ethereum } from '../interfaces';


declare const Buffer: any;
const web3 = new Web3(config.ROPSTEN);


export class Wallet {

  private _web3 = web3;

  public version = this._web3.version;
  public utils = this._web3.utils;
  public eth = this._web3.eth;
  public accounts = this._web3.eth.accounts;
  public getBlockNumber: Promise<number> = this._web3.eth.getBlockNumber();
  public net = this.eth.net.getId().then(id => {
    /**
     * @property: get network.
     */
    switch (id) {
      case 1: return 'mainnet';
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
    return this.accounts.wallet.create(5 ,entropy);
  }

  protected sendTransaction(data: Ethereum.ITxData, privateKey: string): Promise<string> {
    /**
     * @param {data}: Data object for Transaction.
     * @param {privateKey}: PrivateKey for accaunt.
     */
    const privateKeyBufer = new Buffer(privateKey.slice(2), 'hex');
    const tx = new Tx(data);

    tx.sign(privateKeyBufer);
    const serializedTx = tx.serialize();
    const txInHex = `0x${serializedTx.toString('hex')}`;

    return new Promise((resolve, reject) => {
      this._web3.eth.sendSignedTransaction(txInHex, (err, hash) => {
        if (err) { return reject(err); }
        if (hash) { return resolve(hash); }
      });
    });
  }

}
