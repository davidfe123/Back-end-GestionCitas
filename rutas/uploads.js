const express = require('express');
const {fileUpload, verImagen} = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');
const router = express.Router();

router.use(expressFileUpload())
router.put('/uploads/:tipo/:id',fileUpload);
router.get('/uploads/:tipo/:foto',verImagen);


module.exports = router;