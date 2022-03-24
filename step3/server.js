const express = require('express');
const app = express();
const PORT = 3000;

//Middleware - folder to get static assets
app.use(express.static('app'));

//Middleware - folder to get contracts
app.use(express.static('contracts/compiled'));

app.get('/',(req,res) => {
    res.sendFile(`${__dirname}/app/index.html`);
});

app.get('*',(req,res) => {
    res.status(404);
    res.send('Oooops... this URL does not exist');
});

app.listen(PORT,() => {
    console.log(`Anon Communicator app running on port ${PORT}`);
});
