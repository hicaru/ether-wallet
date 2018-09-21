
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

  export interface ITxData {
    nonce?: number | string,
    from?: number | string,
    to: number | string,
    gasLimit: number | string,
    gasPrice: number | string,
    value: number | string
  }
}
