
export namespace Repositories {
  export interface IWallet {
    address: string;
    privateKey: string;
  }
}

export namespace Ethereum {
  export interface IWallet {
    address: string;
    privateKey: string;
    signTransaction(tx: Object): Function;
    sign(data: Object): Function;
    encrypt(password: string): Function; 
  }
}
