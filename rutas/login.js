const express = require('express');
const { login, logingogle, renewToken} = require('../controllers/login');
const validarToken = require('../middleware/jwt');
const router = express.Router();

router.post('/login',login)
router.post('/logingogle',logingogle)
// renovar token
router.get('/renew',validarToken,renewToken);

module.exports = router;