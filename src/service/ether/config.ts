import { data } from '../../app/global';

export const INFURA = (net: string = data.netDefault): string => {
    return `https://${net}.infura.io/` +
           `v3/d9877ecb6cf349baa97ca282de1f2ed4`;
};

export const config = {
    ROPSTEN: INFURA('ROPSTEN'),
    MAINNET: INFURA('MAINNET'),
    KOVAN: INFURA('KOVAN'),
    RINKEBY: INFURA('RINKEBY')
};