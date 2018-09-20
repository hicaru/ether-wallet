import { Repositories } from '../service/interfaces';

export interface IData {
  activeAddress: number;
  wallet: Repositories.IWallet[];
}

export let data = <IData>{
  activeAddress: 0
};

export const storageConfig = {
  name: '__mydb',
  driverOrder: ['indexeddb', 'sqlite', 'websql']
};