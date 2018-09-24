import { Repositories } from '../service/interfaces';

export interface IData {
  activeAddress: number;
  wallet: Repositories.IWallet[];
  netDefault: string;
}

export let data = <IData>{
  activeAddress: 0,
  netDefault: 'ROPSTEN'
};

export const storageConfig = {
  name: '__mydb',
  driverOrder: ['indexeddb', 'sqlite', 'websql']
};