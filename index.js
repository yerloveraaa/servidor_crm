const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'});

// Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos

const cors = require('cors');



// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});

// crear el servidor
const app = express();

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// carpeta publica
app.use(express.static('uploads'));

const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin)
        const existe  =  whitelist.some(dominio=> dominio === origin)
        if(existe){
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}



//Habilitar cors
app.use(cors(corsOptions));

// Rutas de la app
app.use('/', routes());



const host  = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

// puerto
app.listen(port, host, () => {
    console.log('El servidor esta funcionando')
});