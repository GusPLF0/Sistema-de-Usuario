const Sequelize = require('sequelize');


const connection = new Sequelize('usuario', 'root','08012004',{
    host:'localhost',
    dialect:'mysql'
})


module.exports = connection;