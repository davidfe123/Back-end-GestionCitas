const Citas = require("../model/cita");
const Servicios = require("../model/servicioPelu");
const moment = require('moment');


const obtenerCitas = async (req,res)=>{
    try {
        const citasdb = await Citas.find();
        res.json({
            ok:true,
            citasdb,
            msg: "corriendo bien"
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido masl"
        })
    }
}

const crearCita = async (req,res)=>{
    
    try {
        let totalCuenta = 0;
        
        const {usuario,servicio} = req.body
        let hora = req.body.hora;
        console.log(hora)
        hora = new Date(hora);
        console.log(hora)

        const posibleCiata = await Citas.findOnd({hora});

        console.log(posibleCiata);

        // obtenemos servicios de nuestra cita y sumamos para sacar totalCuenta
        for(const serv of servicio){
            const serviciodb = await Servicios.findById(serv);
            totalCuenta = serviciodb.precio + totalCuenta;
        }
    
        const nuevaCita = new Citas({usuario,servicio,hora,totalCuenta});
        
        console.log(nuevaCita)

        await nuevaCita.save();

        res.json({
            ok:true,
            nuevaCita,
            msg: "cita creada"
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido masl"
        })
    }
}

const actualizarCita = async (req,res)=>{

    try {
        let totalCuenta = 0;
        const id = req.params.id
        console.log(id)
        const citaDb = await Citas.findById(id);
        console.log(citaDb)
        if(!citaDb){
            res.status(500).json({
                ok:false,
                msg: "no existe una Cita asi"
            })
        }

        const {...data} = req.body;

        for(const serv of data.servicio){
            const serviciosDb = await Servicios.findById(serv);
            totalCuenta = serviciosDb.precio + totalCuenta
        }

        const citaActualizada = await Citas.findByIdAndUpdate(id,{data,totalCuenta},{new:true});

        res.json({
            ok:true,
            citaActualizada,
            msg: "cita Actualizado"
        })
        
             
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido mall"
        })
    }

}

const eliminarCita = async (req,res)=>{

    try {
        const id = req.params.id
        console.log(id)

        const citaDb = await Citas.findById(id);
        console.log(citaDb)

        if(!citaDb){
            res.status(402).json({
                ok:false,
                msg: "no existe esa cita"
            })
        }

        await Citas.deleteOne(citaDb);

        res.json({
            ok:true,
            msg: "cita eliminada",
            citaDb
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido mall"
        })
    }

    


}


module.exports = {
    obtenerCitas,
    crearCita,
    actualizarCita,
    eliminarCita
}