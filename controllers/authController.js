const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario.js');
const { generarJWT } = require('../helpers/generarJWT.js');

const crearUsuario = async (req, res = response) => {
  try {
    const { name, email, password } = req.body;

    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Ese correo ya está registrado',
      });
    }

    usuario = new Usuario(req.body);

    // Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar usuario en DB
    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    return res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hablar con el admin',
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo',
      });
    }

    // Verificar password
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password',
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el admin',
    });
  }
};

const revalidarToken = async (req, res) => {
  const { uid, name } = req;

  // Generar nuevo JWT

  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  loginUsuario,
  crearUsuario,
  revalidarToken,
};
