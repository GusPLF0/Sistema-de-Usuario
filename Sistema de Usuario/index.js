const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");
const User = require('./database/User');
const bcrypt = require('bcrypt');


connection.authenticate()
    .then(()=>console.log('Sucesso'))
    .catch((error)=>console.log(error))

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
    let salt = bcrypt.genSaltSync(10)
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, salt);
    

    User.create({
        email:email,
        password:password
    }).then(()=>{
        res.redirect('/');
    })

});

app.listen('8080', () => { console.log("App rodando!") })