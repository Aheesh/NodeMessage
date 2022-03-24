const { Web3 } = require("../vendor/web3.min");


console.log("Index.JS file Loaded");

const web3 = new Web3(window.ethereum);
await window.ethereum.enable();
console.log("web3", web3);

const accounts = await web3.eth.getAccounts();
console.log("accounts",accounts)

const ChainID = await web3.eth.net.getId();
console.log("****** CHAIN ID *****",ChainID);
var contractAddress;
// Ropsten contract address  
if (ChainID == 3) {
  console.log("Setting Contract to Ropsten Testnet Address")
  contractAddress = "0xa8E381CaB19732aE8aDFE8A94d2dA2b8b5a97c78"; //Ropsten network contract 
} else if (ChainID==5777) { 
  // SET GANACHE CONTRACT ADDRESS HERE
  console.log("Setting Contract to Local Ganache Address")
  contractAddress = "0xeF163dF8Dc1d0aa44B7A2E7be63b87f4C3f32f27"; //Ganache - local address 
} else {
  console.log("Network not configured for contract call in Mint.js")
}

const getContract_abi = await fetch('./contracts/compiled/artworkabi.json');
