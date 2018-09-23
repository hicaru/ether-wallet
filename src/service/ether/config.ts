export const INFURA = (net: string = 'mainnet'): string => {
    return `https://${net}.infura.io/v3/d9877ecb6cf349baa97ca282de1f2ed4`;
};

export const config = {
    ROPSTEN: INFURA('ropsten'),
    MAINNET: INFURA(),
    KOVAN: INFURA('kovan'),
    RINKEBY: INFURA('rinkeby')
};