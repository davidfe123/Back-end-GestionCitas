const mongoose = require('mongoose');

const usuarioSchemaCasa = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        default:'usuario'
    }
})
// creamos y exportamos el modelo
const Usuario = mongoose.model('Usuario',usuarioSchemaCasa);

module.exports = Usuario;