const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require ('./config/config');


const url = config.bd_string;
const options ={ reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err)=>{
    console.log('erro na conexão com o banco de dados:' + err);
})

mongoose.connection.on('disconnected', () =>{
    console.log('Aplicação desconectada do banco de dados:' )
})


mongoose.connection.on('connected', () =>{
    console.log('Aplicação conectada ao banco de dados');
})

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


const indexRoute = require('./Routes/index');
const userRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', userRoute);



app.listen(3000);

module.exports = app;
