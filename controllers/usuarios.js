const Usuario = require("../model/usuario");


const getUsuarios = async (req,res) =>{
    try {
    const usuariodb = await Usuario.find().select('nombre email role')
    res.json({
        ok:true,
        usuariodb
    })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido masl"
        })  
    }
}

const crearUsuario = async (req,res) =>{

    try {    
    const email = req.body.email;

    const usuariodb = await Usuario.findOne({email});
    console.log(usuariodb)

    if(usuariodb){
        res.status(500).json({
            ok:false,
            msg: "usuario ya existe"
        })
    }

    const nuevoUsuario = new Usuario(req.body)
    await nuevoUsuario.save();

    
    res.json({
        ok:true,
        usuario:nuevoUsuario,
        msg: "usuario guardado"
    })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido masl"
        }) 
    }
}

actualizarUsuario = async (req,res) =>{
    try {
        const id = req.params.id
        const datosActualizados = req.body
        const usuariodb = await Usuario.findById(id);

        if(!usuariodb){
            res.status(404).json({
                ok:false,
                msg: "usuario no existe"
            })
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(id,datosActualizados,{new:true})

        res.json({
            ok:true,
            msg:'usuario actualizado',
            usuarioActualizado
        })


    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "err"
        })
    }
}

const eliminarUsuario = async (req,res) =>{
    try {

        const id = req.params.id
        const usuariodb = await Usuario.findById(id);

        if(!usuariodb){
            res.status(404).json({
                ok:false,
                msg: "usuario no existe"
            })
        }

        await Usuario.deleteOne(usuariodb);

        res.json({
            ok:true,
            id
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "err"
        })
    }
}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}
