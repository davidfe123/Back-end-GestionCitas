const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.Secreto_del_cliente); // ese es la clave secreta
    

async function googleVerify(token) {
        
        const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.ID_de_cliente,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
});

    const payload = ticket.getPayload();
    console.log(payload)
    
    return payload;
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}



module.exports = {
    googleVerify
}
