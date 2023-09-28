const express = require('express');
const { crearServicio, obtenerServicios, actualizarServicio, eliminarServicio } = require('../controllers/servicios');
const validarToken = require('../middleware/jwt');
const { check } = require('express-validator');
const validarCampos = require('../middleware/validar-campos');
const router = express.Router();


router.get('/servicios',validarToken,obtenerServicios);

router.post('/servicios',validarToken,
    [
        check('nombre','el nombre es obligatorio').not().isEmpty(),
        check('descripcion','la descripcion es nesesaria').not().isEmpty(),
        check('duracion','la duracion es obligatoria').notEmpty().isInt(),
        check('precio','el precio es nesesario').notEmpty().isInt(),
        validarCampos
    ]
    ,crearServicio);

router.put('/servicios/:id',validarToken,actualizarServicio);

router.delete('/servicios/:id',validarToken,eliminarServicio);


module.exports = router;