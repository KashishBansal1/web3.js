var Tx = require("ethereumjs-tx").Transaction
const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/75cc0cc5a72940008e7a26b7b113616a')

const account1 = '0x7bbB09d9b8c1Ae65eE568d879cDa9F559BeFeA63' // Your account address 1
const account2 = '0x21c00847beE5374A37e075DbDeBf5671ACBF45eA' // Your account address 2

const privateKey1 = Buffer.from('d8abead8cf7daf26748e964b3bbb95307c5577160ef096ebbbdb5f3715e1f81e', 'hex')
const privateKey2 = Buffer.from('5e5ccf8ab912bbeed617ddf826b5c811af7515942d482ed7cf490fad2a6d4562', 'hex')


web3.eth.getTransactionCount(account1, (err, txCount) => {
    // Build the transaction
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    // Sign the transaction
    const tx = new Tx(txObject)
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    // Broadcast the transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
    })

    web3.eth.getBalance(account1, (err, bal) => { console.log('account 1 balance :', web3.utils.fromWei(bal, 'ether')) })
    web3.eth.getBalance(account2, (err, bal) => { console.log('account 2 balance :', web3.utils.fromWei(bal, 'ether')) })
})