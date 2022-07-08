const service = require('../services/index');
//Metodo para validar si la persona tiene una sesión iniciada.
// next -> middleware, si todo sale bien se ejecuta el metodo que necesitamos que se ejecute
exports.auth = (req, res, next) =>{
    if(!req.headers.authorization){
        return res.status(400).send({
            message: 'No tienes permiso para realizar esta operación'
        })
    }
    const token = req.headers.authorization.split(' ')[1]

    service.decodeToken(token)
        .then(
            (respon) =>{
                req.user = respon
                next()
            }
        )
        .catch(
            (error) =>{
                res.status(error.status).send({
                    message: error.message
                })
            } 
        )
}