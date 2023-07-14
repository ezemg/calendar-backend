/* 
Rutas de Usuarios / Auth
host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require('../controllers/authController.js');
const { validarCampos } = require('../middlewares/validarCamposMiddleware.js');
const { validarJWT } = require('../middlewares/validarJWT.js');

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener 6 caracteres').isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener 7 caracteres').isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
