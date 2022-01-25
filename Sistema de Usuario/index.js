const express = require('express');
const app = express();
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//View Engine

app.set('view engine', 'ejs');

//Estatics
app.use(express.static('public'));


//Rot
app.get('/', (req, res) => {
    res.render("index");
});

app.post('/cadastrar', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
});

app.listen('8080', () => { console.log("App rodando!") })