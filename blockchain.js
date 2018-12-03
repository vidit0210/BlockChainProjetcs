const SHA256 = require('crypto-js/sha256');
const EC= require('elliptic').ec;
//Type of Eliptical Curve 
const ec = new EC('secp256k1');
class Transaction{
    constructor(fromAddress,toAddress,amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    //HashToGeneratewithPrivateKey
    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount);
    }
    signTransaction(signKey){
        if(signKey.getPublic('hex')!==this.fromAddress()){
            throw new Error("You cannot SIgn Transaction for the other Wallets");
        }
        const hashTx = this.calculateHash();
        const sig = signKey.sign(hashTx,'base64');
        this.signature =sig.toDER('hex');
    }
    isValid(){
        if(this.fromAddress===null) true;

        if(!this.signature||this.signature.length===0){
            throw new Error("No signature in this Transaction");
        }
        const publicKey = ec.keyFromPublic(this.fromAddress,'hex');
        return publicKey.verify(this.calculateHash,this.signature);
    }
}
class Block{
    constructor(timestamp,transaction,previousHash=''){
     
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this._calculateHash();
        this.nonce=0;
    }

    _calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.transaction)+this.previousHash+this.nonce).toString();
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
        this.pendingTransactions =[];
        this.mineReward =100;
    }

    _createGenesisBlock(){
        return  new Block('1-1-18','Genesis Block','0');
        
    }
    
 //Mining reward Address if the Miner succesfully mines the Address he/she gets the reward
 minePendingTransaction(AddressofMIner){
     let block = new Block(Date.now(),this.pendingTransactions);
     block.mineBlock(this.difficulty);
     console.log("Successfully Mined");

     //pushing the block in the Block Chain
     this.chain.push(block);
     //Now reward the miner by sending her the Transaction
     this.pendingTransactions =[
         new Transaction(null,AddressofMIner,this.mineReward)
     ];
 }

 createTransaction(transaction){
     this.pendingTransactions.push(transaction);
 }
 getBalanceofAddress(address){
     let balance  =0;
     for(const block of this.chain){
         for(const trans of block.transaction){
             if(trans.fromAddress==address){
                 balance-= trans.amount;
             }
             if(trans.toAddress == address){
                 balance+= trans.amount;
             }
         }
     }
     return balance;
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
module.exports.BlockChain  = BlockChain;
module.exports.Transaction = Transaction;