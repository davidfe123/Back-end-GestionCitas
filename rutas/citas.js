const express = require('express');
const { obtenerCitas, crearCita, actualizarCita, eliminarCita } = require('../controllers/citas');
const {check} = require('express-validator');
const validarCampos = require('../middleware/validar-campos');
const router = express.Router();

router.get('/citas',obtenerCitas);

router.post('/citas',
    [
        check('usuario','El usuario es obligatorio').not().isEmpty(),
        check('servicio','Los Servicios son obligatorios').not().isEmpty(),
        check('hora','Hora de inicio obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearCita);

router.put('/citas/:id',
    [
        check('usuario','El usuario es obligatorio').not().isEmpty(),
        check('servicio','Los Servicios son obligatorios').not().isEmpty(),
        check('hora','Hora de inicio obligatoria').not().isEmpty(),
        validarCampos
    ],
    actualizarCita);

router.delete('/citas/:id',eliminarCita);

module.exports = router;