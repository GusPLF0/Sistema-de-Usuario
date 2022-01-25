const express = require('express');
const app = express();


app.get('/',(req, res) => {
    console.log("Tudo certo!");
});


app.listen('8080',()=>{console.log("App rodando!")})