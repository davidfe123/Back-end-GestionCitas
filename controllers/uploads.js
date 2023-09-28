const { response } = require("express");
const { file } = require("googleapis/build/src/apis/file");
const fs = require('fs');
const path = require('path');
const {v4:uuidv4} = require('uuid')
const multer = require('multer');
const sharp = require('sharp');
const actualizarImagen = require("../helpers/actualizar-img");


const fileUpload = (req,res=response)=>{
    
    try {
        const tipo = req.params.tipo;
        const id = req.params.id;

    console.log(tipo);

    // tipos validos 
    const tipoValidos = ['usuarios','servicios'];

    // validamos que nuestro tipo archivo sea valido
    // dependiendo a los tipos que determinamos
    if(!tipoValidos.includes(tipo)){
        res.status(402).json({
            ok:false,
            msg:'tipo de archivo no valido'
        })
    }

    // validacion hay o no hay archivo de express-fileupload
    if(!req.files || Object.keys(req.files).length === 0 ){
        return res.status(400).json({
            ok:false,
            msg:'no hay ningun archivo'
        })
    }

    //obtenemos nombre del archivo y sacamos su extencion
    const archivo = req.files.imagen
    const nombreArchivo = archivo.name
    const extencionArchivo = nombreArchivo.split('.').pop();

    // extenciones que vamos a permitir
    const extPermitida = ['png','jpg','gif','jpeg'];

    // validamos que nuestro archivo tenga una de las extenciones
    // que deseamos 
    if(!extPermitida.includes(extencionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'no es una extension permitida'
        })
    }

    // generar el nombre del archivo
    const nombreImagen = `${uuidv4()}.${extencionArchivo}`;

    // path para guardarimagen
    const path = `./uploads/${tipo}/${nombreImagen}`;
    console.log(path)

    //mover la imagen al lugar deseado
    archivo.mv(path,(err)=>{
        if(err){
            console.log(err)
            return res.status(500).json({
                ok:false,
                msg:' error al mover la imagen'
            });
        }
        // actualizar base de datos
        actualizarImagen(tipo,id,nombreImagen);

            res.json({
                ok:true,
                msg:'archivo subido',
                nombreArchivo
            });
    })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "algo ha salido masl"
        }) 
    }
}

const verImagen = (req,res=response)=>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);

    console.log(pathImg)

    //imagen por defecto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname,`../uploads/no-image-found-360x250.png`);
        res.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload,
    verImagen
}