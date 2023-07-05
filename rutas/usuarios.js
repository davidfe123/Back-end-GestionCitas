
const express = require('express')
const validarToken = require('../middleware/jwt')

const router = express.Router();
const { getUsuarios, crearUsuario, eliminarUsuario, actualizarUsuario } = require('../controllers/usuarios');


router.get('/usuarios',validarToken,getUsuarios);
router.post('/usuarios',validarToken,crearUsuario);
router.put('/usuarios/:id',validarToken,actualizarUsuario);
router.delete('/usuarios/:id',validarToken,eliminarUsuario);


module.exports = router;

