const {mongoose,model} = require('mongoose');

const servicioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        minlength:20,
        maxlength:150,
        required:true
    },
    precio:{
        type:Number,
        required:true
    }
})

const Servicios = mongoose.model('Servicios',servicioSchema);

module.exports = Servicios;