const express = require('express');
const EthCrypto = require('eth-crypto');
const { request, response } = require('express');
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
app.post('/api',(request,response) => {console.log("*************** SERVER /api ROUTE  START ***********************")
    console.log("######## THIS IS THE REQUEST ##########",request.body);
    console.log("*************** SERVER /api ROUTE END ***********************")
});

app.get('*',(req,res) => {
    res.status(404);
    res.send('Oooops... this URL does not exist');
});

app.listen(PORT,() => {
    console.log(`Anon Communicator app running on port ${PORT}`);
});
