const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Conectarnos a la BD
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00.rxbtq.mongodb.net:27017,cluster0-shard-00-01.rxbtq.mongodb.net:27017,cluster0-shard-00-02.rxbtq.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-c8u26x-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API corriendo en el puerto ${port}`);
})