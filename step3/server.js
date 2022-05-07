//const express = require('express');
import express, { response } from 'express';
import Web3 from 'web3';
//import fetch from 'node-fetch';
import fs from 'fs';
import pinataSDK from '@pinata/sdk';
//const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('26689a58bbd3e05207c5','622c0634c379b1139f92dfd22f6dd79dd600df1eb09bec13cb70456a5e3835fa');
//const fetch = require('node-fetch'); 

//const EthCrypto = require('eth-crypto');
//const { request, response } = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended:false}))
//Middleware - folder to get static assets
app.use(express.static('app'));

//to use json in our API
app.use(express.json({limit : '1mb'}));



//Middleware - folder to get contracts
app.use(express.static('contracts/compiled'));

app.get('/',(req,res) => {
    res.sendFile(`${__dirname}/app/index.html`);
});

//Setup this api for collecting data from client side UI i.e. form data.
app.post('/api/:web3',buildjson,pindata,mint,(req,res,next) => {
    console.log("in Route /api with web3 passed")
    response.end();

});
/* => {
    //Write the function to Build JSON and Generate IPFS hash
    console.log("After pindata call on SERVER.JS /api route ===> ipfs");
    // Use the IPFS Hash and web3 contract object to mint token

    // Success message Token minted
    
    response.end();
});*/

function buildjson(req,res,next){
    //console.log("REQUEST PARAMS HERE",request.params['web3']);
    console.log("*************** SERVER buildjson ROUTE  START ***********************")
    console.log("######## THIS IS THE REQUEST ##########",req.body);
    console.log(`*************** SERVER /api ROUTE END ***********************,
    ${typeof(req.body)},#### parse items x Recipient Address = ,${req.body.x},
    ### parse item y message : ${req.body.y},
    ### parse item z Sender Address : ${req.body.z}`);
    next();
}

async function pindata(req,res,next) {
    console.log("pindata function ####### Json for IPFS",req.body);
   //Calling pinata service
   await  pinata.pinJSONToIPFS(req.body).then((res) => {
        console.log("pinJSONToIPFS Success",res);
        req.body.IpfsHash=res.IpfsHash;
        req.body.IpfsTimeStamp=res.Timestamp;
    }).catch((err) => {
        console.log(err);
    });
    next();
    //console.log("REsponse object",res.body);
}

async function mint(req,res) {
    console.log("Mint Function",req.body);
    // Web3 magic here
    var web3 = new Web3(new Web3.providers.HttpProvider('https://locahost:7545'))
    console.log("We have web3 ----- PHEW!!!!");

    //const accounts = await web3.eth.getAccounts();
    //console.log("accounts",accounts);

    console.log("Setting Contract to Local Ganache Address")
    const contractAddress = "0xF32A0316ABD5E96502c8C8B584D490D690413B7B"; //Ganache - local address 
    console.log("CONTRACT ADDRESS GANACHE --> ",contractAddress);

    //const getContract_abi = await fetch('/Users/aheeshnagraj/Documents/GitHub/NodeMessage/step3/app/contracts/compiled/artworkabi.json');
    const abi_data=fs.readFileSync('/Users/aheeshnagraj/Documents/GitHub/NodeMessage/step3/app/contracts/compiled/artworkabi.json',(err,data)=> {
        if(err) {
            console.error(err);
            return;
        }
        console.log(data);
    });
    
    const abistring= JSON.parse(abi_data);
    console.log("getContract() typeof abistring --->", typeof(abistring));
    console.log("getContract() abistring object ---> ",abistring);


} 

// Define Route to view inbox


app.get('*',(req,res) => {
    res.status(404);
    res.send('Oooops... this URL does not exist');
});

app.listen(PORT,() => {
    console.log(`Anon Communicator app running on port ${PORT}`);
});


function URI_Fetch(req,res,next) {
    console.log("****IN URI_FETCH FUNCTION ******");
    next();

}