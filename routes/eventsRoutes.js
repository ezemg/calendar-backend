/* 
Rutas de Eventos / Events
host + /api/events
*/

const express = require('express');
const { Router } = express;
const { check } = require('express-validator');

const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require('../controllers/eventsController.js');

const { validarJWT } = require('../middlewares/validarJWT.js');
const { validarCampos } = require('../middlewares/validarCamposMiddleware.js');
const { isDate } = require('../helpers/isDate.js');

const router = Router();

// Todas las peticiones validan token
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
  '/',
  [
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Actualizar evento
router.put(
  '/:id',
  [
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

// Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;
