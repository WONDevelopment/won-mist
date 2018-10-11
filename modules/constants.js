export const InfuraEndpoints = {
  ethereum: {
    http: {
      Main: 'https://bc.1won.com',
      Ropsten: 'https://ropsten.infura.io/mist',
      Rinkeby: 'https://rinkeby.infura.io/mist',
      Kovan: 'https://kovan.infura.io/mist'
    },
    websockets: {
      // Main: 'ws://127.0.0.1:8546',
      Main: 'wss://bc.1won.com/ws',
      Ropsten: 'wss://ropsten.infura.io/ws/mist',
      Rinkeby: 'wss://rinkeby.infura.io/ws/mist',
      Kovan: 'wss://kovan.infura.io/ws/mist'
    }
  },
  ipfs: {
    gateway: 'https://ipfs.infura.io',
    rpc: 'https://ipfs.infura.io:5001'
  }
};
