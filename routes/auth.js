const express = require('express');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario_model');
//const Joi = require('@hapi/joi');
const ruta = express.Router();

ruta.post('/', (req, res) => {
    Usuario.findOne({email: req.body.email})
        .then(data => {
            if(data){
                const passwordValid = bcrypt.compareSync(req.body.password, data.password);
                if(!passwordValid) return res.status(400).json({error: 'ok', message:'Usuario o contraseña incorrecta'});
                const token = jwt.sign({ 
                    usuario: {_id: data._id, nombre: data.nombre, email: data.email} 
                }, config.get('configToken.key'), { expiresIn: config.get('configToken.expiresIn') });
                //jwt.sign({_id: data._id, nombre: data.nombre, email: data.email}, 'password');
                res.json({
                    usuario: {_id: data._id, nombre: data.nombre, email: data.email},
                    token
                });
            }else{
                res.status(400).json({error: 'ok', mensaje: 'Usuario o contraseña incorrectos'})
            }
        })
        .catch(err => {
            res.status(400).json({error: 'ok', message: 'Error interno'});
        });
});

module.exports = ruta;