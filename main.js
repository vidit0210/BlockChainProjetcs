const {BlockChain,Transaction} = require('./blockchain');
const StarkCoin = new BlockChain();
StarkCoin.createTransaction = new Transaction('a1','a2',100);
StarkCoin.createTransaction = new Transaction('a2','a1',50);

console.log('Starting the Miner');
StarkCoin.minePendingTransaction('Hulk');
console.log("Balance of Hulk is :",StarkCoin.getBalanceofAddress('Hulk'));
//Balance will show 0 because it is in Mining Method

console.log('Starting the Miner Again');
StarkCoin.minePendingTransaction('Hulk');
console.log("Balance of Hulk is :",StarkCoin.getBalanceofAddress('Hulk'));
