const jwt = require('jsonwebtoken');
global.SALT_KEY = '8de19fa2-6ec8-442a-9387-bc6d574477e1';

//Gerar/Codificar Token
exports.generateToken = function (data)  {

    return jwt.sign({data}, global.SALT_KEY, {expiresIn: '1d'});
}

//Decodificar Token
exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY); 
    return data;
}

//Middleware interceptor
exports.authorize = function (req, res, next){
    //1 passo - busco o token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message:'Acesso restrito'
        });
    }else{
        //Token encontrado. Verificar Token.
        jwt.verify(token, global.SALT_KEY, function(error, decode){
            if(error){ //não conseguiu decodificar
                res.status(401).json({
                    message:'Token inválido'
                });
            }else{
                next();
            }
        });
    }

}