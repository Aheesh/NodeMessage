//const express = require('express');
import express from 'express';
import fetch from 'node-fetch';
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

app.use(express.json({limit : '1mb'}));



//Middleware - folder to get contracts
app.use(express.static('contracts/compiled'));

app.get('/',(req,res) => {
    res.sendFile(`${__dirname}/app/index.html`);
});

//Setup this api for collecting data from client side UI i.e. form data.
app.post('/api',buildjson,pindata,mint);
/* => {
    //Write the function to Build JSON and Generate IPFS hash
    console.log("After pindata call on SERVER.JS /api route ===> ipfs");
    // Use the IPFS Hash and web3 contract object to mint token

    // Success message Token minted
    
    response.end();
});*/

function buildjson(req,res,next){
    console.log("*************** SERVER buildjson ROUTE  START ***********************")
    console.log("######## THIS IS THE REQUEST ##########",req.body);
    console.log(`*************** SERVER /api ROUTE END ***********************,
    ${typeof(req.body)},#### parse items x Recipient Address = ,${req.body.x},
    ### parse item y message : ${req.body.y},
    ### parse item z Sender Address : ${req.body.z}`);
    next();
}

async function pindata(req,res,next) {
    console.log("Json for IPFS",req.body);
   //Calling pinata service
   await  pinata.pinJSONToIPFS(req.body).then((res) => {
        console.log("pinJSONToIPFS Success",res);
    }).catch((err) => {
        console.log(err);
    });
    next();
    //console.log("REsponse object",res.body);
}

function mint(req,res) {
    console.log("Mint Function",req.body);
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