import Web3 from 'web3';
import Tx from 'ethereumjs-tx';
import utils from 'web3-utils';
import Accounts from 'web3-eth-accounts';
import { config } from './config';
import { Ethereum } from '../interfaces';

declare const Buffer: any;

const provider = new Web3.providers.HttpProvider(config.PROVIDER);
const web3 = new Web3(provider);
const accounts = new Accounts(config.PROVIDER);


export class Wallet {

  private _web3 = web3;

  public version = this._web3.version;
  public utils = utils;
  public eth = this._web3.eth;
  public accounts = accounts;
  public getBlockNumber: Promise<number> = new Promise((resolve, reject) => {
    this._web3.eth.getBlockNumber((err, block) => {
      if (err) {
        return reject(err);
      }
      if (block) {
        return resolve(+block);
      }
    });
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
      this.eth.sendRawTransaction(txInHex, (err, hash) => {
        if (err) { return reject(err); }
        if (hash) { return resolve(hash); }
      });
    });
  }

}
