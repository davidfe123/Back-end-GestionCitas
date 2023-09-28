const jwt = require('jsonwebtoken')

const validarToken = (req,res,next)=>{

    try {
        const token = req.header('x-token');
        if(!token){
            res.status(404).json({
                ok:false,
                msg: "no hay ningun token"
            })
        }
        const {uid} = jwt.verify(token,process.env.LLAVE_TOKEN);
        req.uid = uid
        next();
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "token no valido"
        })
    }
}

 module.exports = validarToken