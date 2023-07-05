const express = require('express');
const { obtenerCitas, crearCita, actualizarCita, eliminarCita } = require('../controllers/citas');
const router = express.Router();

router.get('/citas',obtenerCitas);
router.post('/citas',crearCita);
router.put('/citas/:id',actualizarCita);
router.delete('/citas/:id',eliminarCita);

module.exports = router;