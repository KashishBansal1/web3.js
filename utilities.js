const Web3 = require("web3");
// const web3 = new Web3("https://mainnet.infura.io/hqRzEqFKv6IsjRxfVUWH");
const web3 = new Web3(
  "https://rinkeby.infura.io/v3/4d4f8b362786418dbd0a443ed1ca2039"
);
// Get average gas price in wei from last few blocks median gas price
web3.eth.getGasPrice().then((result) => {
  console.log(web3.utils.fromWei(result, "ether"));
});

// Use sha256 Hashing function
console.log(web3.utils.sha3("Kashish"));

// Use keccak256 Hashing function (alias)
console.log(web3.utils.keccak256("Kashish"));

// Get a Random Hex
console.log(web3.utils.randomHex(32));

// Get access to the underscore JS library
// var _ = web3.utils._;
// console.log(web3.utils._);
// _.each({ key1: "value1", key2: "value2" }, (value, key) => {
//   console.log(key);
// });
