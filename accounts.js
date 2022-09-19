const Web3 = require("web3");
const web3 = new Web3(
  "https://rinkeby.infura.io/v3/4d4f8b362786418dbd0a443ed1ca2039"
);
const address = "0x3E667661068DB31328Aa25eB0a4E57FB79789972"; // Your account address goes here

web3.eth.getBalance(address, (err, bal) => {
  console.log("account 1 balance :", bal);
});
