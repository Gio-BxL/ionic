//Importamos
require('./config/config');
const mongoose = require('mongoose');
const express = require('express');
//Declarando constante app
const app = express();
const bodyParser = require('body-parser');

//Habilitacion de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-With, Content-Type,Accept, Authorization, token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS '
    );
    next();
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));


//Archivo de rutas
app.use(require('./routes/index'));

//Conexion a la base de datos
mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err, resp) => {
        if (err) throw err;

        console.log('Base de datos online');
    });

//Puerto de escucha.
app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto', process.env.PORT);
});