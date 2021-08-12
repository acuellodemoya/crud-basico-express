const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * Middleware para validar token y proteger rutas.
 */
 const validarToken = (req, res, next) => {
    const token = req.get('auth');
    jwt.verify(token, config.get('configToken.key'), (err, decoded) => {
        if(err) return res.status(401).json(err)
        req.usuario = decoded.usuario;
        next();
    });
};


module.exports = validarToken;