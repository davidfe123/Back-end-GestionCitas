const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    },
    img:{
        type:String
    }
})

// para poder utilizar el plugin de la paginacion
usuarioSchemaCasa.plugin(mongoosePaginate);

// creamos y exportamos el modelo
const Usuario = mongoose.model('Usuario',usuarioSchemaCasa);

module.exports = Usuario;