const {mongoose,model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const servicioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        minlength:20,
        maxlength:80,
        required:true
    },
    duracion:{
        type:Number,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    img:{
        type:String
    }
})

servicioSchema.plugin(mongoosePaginate);
const Servicios = mongoose.model('Servicios',servicioSchema);

module.exports = Servicios;