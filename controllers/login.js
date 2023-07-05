const response = require('express')
const Usuario = require('../model/usuario')
const jwt = require('jsonwebtoken')

 login = async (req,res = response) =>{
    try {
        
        const {email,password} = req.body
        const usuariodb = await Usuario.findOne({email})
        
        if(!usuariodb){
            res.status(404).json({
                ok:false,
                msg: "usuario no registrado"
            })
        }
        
        if(password !== usuariodb.password){
            res.status(404).json({
                ok:false,
                msg: "password incorrecta"
            })
        }
        // generacion del token
        const uid = usuariodb.id;
        const token = jwt.sign(uid,process.env.LLAVE_TOKEN);

        res.json({
            ok:true,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido mal"
        }) 
    }
 }

module.exports = {
    login
}