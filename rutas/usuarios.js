
const express = require('express')
const validarToken = require('../middleware/jwt')

const router = express.Router();
const { getUsuarios, crearUsuario, eliminarUsuario, actualizarUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');
const validarCampos = require('../middleware/validar-campos')


router.get('/usuarios',validarToken,getUsuarios);

router.post('/usuarios',
    [   
        check('nombre','el nombre es obligatorio').not().isEmpty(),
        check('password','el password es obligatorio y tiene que ser valido').not().isEmpty(),
        check('email','el imail es obligatorio').isEmail(),
        validarCampos
    ],crearUsuario);

router.put('/usuarios/:id',
    [   
        validarToken,
        check('nombre','el nombre es obligatorio').not().isEmpty(),
        check('email','el imail es obligatorio').isEmail(),
        validarCampos
    ],actualizarUsuario);

router.delete('/usuarios/:id',validarToken,eliminarUsuario);


module.exports = router;

