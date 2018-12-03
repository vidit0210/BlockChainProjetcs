const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timestamp,data,previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this._calculateHash();
    }

    _calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data)+this.previousHash).toString();
    }
}
class BlockChain{
    constructor(){
        this.chain = [this._createGenesisBlock()];
    }

    _createGenesisBlock(){
        return  new Block(0,'1-1-18','Genesis Block','0');
        
    }
    
    addBlock(block){
        block.previousHash = this.chain[this.chain.length-1].hash;
        block.hash = block._calculateHash();
        this.chain.push(block);
    }

    getBlock(index){
        for(i=1;i<this.chain.length;i++){
            if(i==index){
                return this.chain[i];
            }
        }
        return -1;
    }
    getcount(){
        return this.chain.length;
    }

    validateChain(){
        for (let i=1;i<this.chain.length;i++){
            const currentBlock = this.chain[i];//1
            const previousBlock = this.chain[i-1];//0

             if(currentBlock.hash !== currentBlock._calculateHash()){
                 console.log(i);
                 console.log(currentBlock.hash);
                 console.log(currentBlock._calculateHash())
                 console.log("DATA CHANGED");
                 return false;
             }
            if(currentBlock.previousHash !== previousBlock.hash){
                console.log(`Previous Hash ${currentBlock.previousHash} and Hash ${previousBlock.hash}
                are not equal `);
                return false;
            }
        
        }
        return true;
    }

}
let block1 = new Block(1,'2-1-18',{amount:5});
let block2 = new Block(2,'3-1-18',{amount:10});
const StarkCoin = new BlockChain();
StarkCoin.addBlock(block1);
StarkCoin.addBlock(block2);
//console.log(JSON.stringify(StarkCoin,null,4));
console.log(StarkCoin.validateChain());
StarkCoin.chain[1].data = {amount :9999};
StarkCoin.chain[1].hash = StarkCoin.chain[1]._calculateHash();
// console.log(StarkCoin.validateChain());
//StarkCoin.chain[1].hash = 'a2e6ce7ec1dece55c59d570b9d5544b64d0ffd3138d081b7fedc718ca7801eb';
console.log(StarkCoin.validateChain());

