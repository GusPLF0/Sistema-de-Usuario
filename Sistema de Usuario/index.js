const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./database/database");
const User = require('./database/User');
const bcrypt = require('bcrypt');
const session = require('express-session');

//Sessions

app.use(session({
    secret: 'oaksdopaksdpoaskdapsokd', cookie: { maxAge: 60000}
}))


//database
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


app.get('/cadastrar',(req,res)=>{
    res.render("cadastrar");
});

app.post('/cadastrarNovo', (req, res) => {
    let salt = bcrypt.genSaltSync(10)
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, salt);
    
    User.findOne({where:{email:email}}).then(user=>{
        if(user == undefined){
            User.create({
                email:email,
                password:password
            }).then(()=>{
                res.redirect('/');
            })
        }else{
            res.redirect('/')
        }
    })

});

app.post('/login',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;


    User.findOne({where:{email:email}}).then(user=>{
        if(user !=undefined){
            let correct = bcrypt.compareSync(password,user.password);

            if(correct){
                req.session.user = {
                    email: user.email
                }
                res.redirect('/listagem')
            }else{
                res.redirect('/')
            }
        }else{
            res.redirect('/')
        }
    })
});

app.get('/listagem',(req,res)=>{
    User.findAll({raw:true}).then(usuarios=>{res.render('listagem',{usuarios})});
});

app.post('/user/delete',(req,res)=>{
    let id = req.body.id;

    User.findOne({where:{id:id}}).then(user=>{
        if(user == undefined){
            res.redirect('/listagem');
        }else{
            User.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect('/listagem');
            })
        }
    })
});

app.listen('8080', () => { console.log("App rodando!") })