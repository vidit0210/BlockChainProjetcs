const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timestamp,data,previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this._calculateHash();
        this.nonce=0;
    }

    _calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data)+this.previousHash+this.nonce).toString();
    }

        mineBlock(difficulty){
            while(this.hash.substring(0,difficulty)!==Array(difficulty+1).join("0")){
                this.nonce++;
                this.hash = this._calculateHash();
            }
            console.log("Block Mined : ",this.hash);
        }
}
class BlockChain{
    constructor(){
        this.chain = [this._createGenesisBlock()];
        this.difficulty=3;
    }

    _createGenesisBlock(){
        return  new Block(0,'1-1-18','Genesis Block','0');
        
    }
    
    addBlock(block){
        block.previousHash = this.chain[this.chain.length-1].hash;
      //  block.hash = block._calculateHash();
      //Mining Code
      block.mineBlock(this.difficulty);
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
console.log('Mining Block 1..');
StarkCoin.addBlock(block1);
console.log('Mining Block 2...');
StarkCoin.addBlock(block2);


