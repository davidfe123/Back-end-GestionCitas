const {model,Schema,mongoose} = require('mongoose')

const citaSchema = new Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    },
    servicio:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servicios',
        required:true
    }],
    hora:{
        type:Date,
        required:true
    },
    totalCuenta:{
        type:Number,
        default:0
    }
});

const Citas = mongoose.model('Citas',citaSchema);
module.exports = Citas;

