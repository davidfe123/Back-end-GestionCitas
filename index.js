
const express = require('express');
const dbConeccion = require('./dataBase/config');


require('dotenv').config();
const cors = require('cors')
const app = express();



app.use(cors());

//carpeta publica
app.use(express.static('public'))

// conexccion base de datos
dbConeccion();

// para que express pueda leer los json correctamente
app.use(express.json());

// rutas
app.use('/api',require('./rutas/usuarios'));
app.use('/api',require('./rutas/login'));
app.use('/api',require('./rutas/servicios'));
app.use('/api',require('./rutas/citas'));
app.use('/api',require('./rutas/uploads'));



const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

