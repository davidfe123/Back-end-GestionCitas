  

const mongoose = require('mongoose');
require('dotenv').config();

// URL de conexión a la base de datos
const mongoURI = process.env.CONEXION_DB;


const dbConeccion = async() => {

    try {
        // Conexión a la base de datos
        mongoose.connect(mongoURI,
            {
            useNewUrlParser: true,
            useUnifiedTopology: true
            })
        
        console.log('db online')

    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }

    
}

module.exports = dbConeccion;

