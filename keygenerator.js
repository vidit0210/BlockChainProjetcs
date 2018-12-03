//Elliptic helps to make address and sign transacation
const EC= require('elliptic').ec;
//Type of Eliptical Curve 
const ec = new EC('secp256k1');
const key = ec.genKeyPair();
const privateKey  = key.getPrivate('hex');
const publicKey = key.getPublic('hex');
console.log('Private key is:',privateKey);
console.log('Public Key is :',publicKey);