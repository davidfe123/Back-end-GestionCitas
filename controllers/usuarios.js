const Usuario = require("../model/usuario");
const generarJWT = require('../helpers/generar-jwt')


const getUsuarios = async (req,res) =>{
    try {
    const page = req.query.page || 1
    const usuariodb = await Usuario.paginate({},{limit:5,page});
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
    const nombreUsuario = req.body.nombre;
    const email = req.body.email;
    const usuariodb = await Usuario.findOne({email});
    //console.log(usuariodb)

    if(usuariodb){
        return res.status(400).json({
            ok:false,
            msg: "usuario ya existe"
        })
    }

    const nuevoUsuario = new Usuario(req.body)
    await nuevoUsuario.save();

    // generacion del token
    const token = await generarJWT(nuevoUsuario.id);
    console.log(token);
    
    res.json({
        ok:true,
        usuario:nuevoUsuario,
        token,
        msg: "usuario guardado"
    })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido masl"
        }) 
    }
}

const actualizarUsuario = async (req,res) =>{
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

        const{password,email,nombre,...campos}= req.body

        if(usuariodb.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "ya existe un usuario con ese email"
                });
            }
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
            return res.status(404).json({
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
            msg: "error"
        })
    }
}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}
