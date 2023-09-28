const {response} = require('express');
const Servicios = require('../model/servicioPelu');

const obtenerServicios = async (req,res)=>{
    try {
        
        const page = req.query.page || 1

        const serviciosDb = await Servicios.paginate({},{limit:4,page})

        res.json({
            ok:true,
            serviciosDb,
            msg: "servicio creado"
        })
         
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido masl"
        })
    }
}

const crearServicio = async (req,res = response)=>{
    try {
        const nombre = req.body.nombre
        const servicioDb = await Servicios.findOne({nombre});
        
        if(servicioDb){
            return res.status(400).json({
                ok:false,
                msg: "servicio ya existe"
            })
        }
        const nuevoServicio = new Servicios(req.body);
        await nuevoServicio.save();

        res.json({
            ok:true,
            nuevoServicio,
            msg: "lista servicios"
        })
        
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido masl"
        })
    }

}

actualizarServicio = async (req,res)=>{

    try {
        const id = req.params.id
        console.log(id)
        const dataActualizada = req.body;
        const servicioDb = await Servicios.findById(id);
        console.log(servicioDb)

        if(servicioDb==null){
            res.status(500).json({
                ok:false,
                msg: "no existe servicio un servicio"
            })
        }

        const servicioActualizado = await Servicios.findByIdAndUpdate(id,dataActualizada,{new:true});
        
        res.json({
            ok:true,
            servicioActualizado,
            msg: "servicio Actualizado"
        })
        
             
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido mal"
        })
    }

}

eliminarServicio = async (req,res = response)=>{
    try {
        const id = req.params.id
        console.log(id)
        const servicioDb = await Servicios.findById(id);
        console.log(servicioDb)
        if(!servicioDb){
            res.status(500).json({
                ok:false,
                msg: "no existe ese servicio"
            })
        }
    
        await Servicios.deleteOne(servicioDb);

        res.json({
            ok:true,
            msg: "servicio eliminado",
            servicioDb
        })
              
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido masl"
        })
    }

}

module.exports = {
    crearServicio,
    obtenerServicios,
    actualizarServicio,
    eliminarServicio
}