
const fs = require('fs');
const Usuario = require('../model/usuario');
const Servicios = require('../model/servicioPelu');

const borrarImagen=(path)=>{
    if(fs.existsSync(path)){
        //borrar imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo,id,nombreArchivo)=>{

    let pathViejo = '';

    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            console.log(usuario);
            if(!usuario){
                console.log('no es un usuario por id');
                return false;
            }
                console.log(usuario);
                pathViejo = `./uploads/usuarios/${usuario.img}`;
                borrarImagen(pathViejo);
    
                usuario.img = nombreArchivo;
                await usuario.save();
                return true;
            break;

        case 'servicios':
            const serviciosP = await Servicios.findOne({id});
            if(!serviciosP){
                console.log('no es un servicio por id');
                return false;
            }

            pathViejo = `./uploads/servicios/${serviciosP.img}`;
            borrarImagen(pathViejo);

            serviciosP.img = nombreArchivo;
            await serviciosP.save();
            return true;
            break;
    
        default:
            break;
    }
}

module.exports = actualizarImagen;