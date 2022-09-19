var Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
const web3 = new Web3(
  "https://rinkeby.infura.io/v3/4d4f8b362786418dbd0a443ed1ca2039"
);

const account1 = "0x3E667661068DB31328Aa25eB0a4E57FB79789972"; // Your account address 1
const account2 = "0xC4e3BF8DA4cc6DD2a8ACb773F7DB548064046BF6"; // Your account address 2

const privateKey1 = Buffer.from(
  "856bb2b57c74b4c22cce1f96823bb82e23d20c02e0757e188e1f42fe75c9e7cc",
  "hex"
);
const privateKey2 = Buffer.from(
  "b76b746be81cb4e977560f9a1e422da49ed35f4a55c76e028edef1d9bc9d1404"
);
web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei("0.0001", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("1", "gwei")),
  };

  // Sign the transaction
  const tx = new Tx(txObject);
  tx.sign(privateKey1);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
    // Now go check etherscan to see the transaction!
  });
});
