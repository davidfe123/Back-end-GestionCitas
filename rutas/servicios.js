const express = require('express');
const { crearServicio, obtenerServicios, actualizarServicio, eliminarServicio } = require('../controllers/servicios');
const validarToken = require('../middleware/jwt');
const router = express.Router();


router.get('/servicios',validarToken,obtenerServicios);
router.post('/servicios',validarToken,crearServicio);
router.put('/servicios/:id',validarToken,actualizarServicio);
router.delete('/servicios/:id',validarToken,eliminarServicio);


module.exports = router;