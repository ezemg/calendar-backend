const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario.js');

const validarJWT = async (req = request, res = response, next) => {
  // x-token headers
  const token = req.header('x-token');

  // Valido si viene o no token
  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la peticion',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Incluyo el valor del uid y del name a la request
    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido',
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
