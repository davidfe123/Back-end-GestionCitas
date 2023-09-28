const response = require('express')
const Usuario = require('../model/usuario')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const jwt = require('jsonwebtoken');
const { googleVerify } = require('../helpers/google-verify');
const generarJWT = require('../helpers/generar-jwt');

const login = async (req,res = response) =>{
    try {

        // desestructuramos el body de nuestra peticion
        const {email,password} = req.body
        const usuariodb = await Usuario.findOne({email}).populate('nombre email role img');

        // validamos que nuestro usuario este registrado con ese email
        
        if(!usuariodb){
            return res.status(400).json({
                ok:false,
                msg: "usuario no registrado"
            })
        }
        
        // validamos la clave que sea igual a la del usuario
        if(password != usuariodb.password){
            return res.status(400).json({
                ok:false,
                msg: "password incorrecta"
            })
        }
        // generacion del token
        const token = await generarJWT(usuariodb.id);
        //const usuario = usuariodb.nombre

        res.json({
            ok:true,
            msg:'autenticación satisfactoria',
            token
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido mal"
        }) 
    }
 }

const logingogle = async (req,res)=>{

    try {
        const googleUser = await googleVerify(req.body.token)
    } catch (error) {
        res.json({
            ok:true,
            msg: req.body.token
            
        })
    }

}

const renewToken = async (req,res=response)=>{
    
    const uid = req.uid;
    //generar el token - jwt
    const token = await generarJWT(uid);
    // obtener usuario
    const usuario = await Usuario.findById(uid).select('-password');
    res.json({
        ok:true,
        token,
        usuario
    })
    
}

module.exports = {
    login,
    logingogle,
    renewToken
}