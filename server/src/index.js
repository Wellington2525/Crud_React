require("dotenv").config();
const express = require('express');
const mysql = require("mysql2");
const cors = require("cors");
const { Router } = require("express");
const morgan =require('morgan');
require("./config/conexion")



/////inicializacion
const app = express();

//settings
app.set('port', process.env.Port || 4000);

//middleware
 app.use(express.json())
 app.use(cors());
app.use(morgan('dev'));

///Router
app.use(require('./router/rout'));




//starting the server 
app.listen(app.get('port'), ()=>{
    console.log('server starts at port no : ', app.get('port'));
})