const UserModel = require('../models/user');
const service = require('../services/index');
const nodemailer = require('nodemailer')
//Metodo para almacenar un nuevo usuario
// @param {*} req => Todo lo que enviamos desde el body (formulario);
// @param {*} res => La respuesta que devolverá

exports.create = (req, res) =>{
    if(Object.entries(req.body).length == 0){
        return res.status(400).send({
            message: 'Todos los campos son obligatorios.'
        })
    }
    const user = new UserModel({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        birthDate: req.body.birthDate,
        age: req.body.age
    })

    user.save().then((dataUser) =>{res.send(dataUser)})
    .catch((error) =>{
        res.status(500).send({
            message: error.message
        })
    })
}

//Metodo para actualizar un usuario
exports.update = (req, res) =>{
    if(Object.entries(req.body).length == 0){
        return res.status(400).send({
            message: 'Los datos son obligatorios.'
        })
    }

    const user = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        birthDate: req.body.birthDate,
        age: req.body.age
    }

    // findByIdAndUpdate : Metodo de mongoose que permite buscar por id y actualizar usuario
    // tiene los parametros;
    // - El id del usuario => req.params.id que se envia por la URL.
    // - Los datos nuevos
    UserModel.findByIdAndUpdate(req.params.id, user, {new: true})
    .then(
        (userUpdate) =>{
            res.send(userUpdate)
        }
    ).catch(
        (error) =>{
            res.status(500).send({
                message:error.message
            })
        }
    )
}

exports.getAll = (req, res) => {
    UserModel.find()
        .then((users) => {res.send(users)})
        .catch(
            (error) => {
                res.status(500).send({
                    message: error.message
                })
            }
        )
}

exports.getOne = (req, res) =>{
    UserModel.findById(req.params.id)
    .then((user) => {res.send(user)})
    .catch(
        (error) => {
            res.status(500).send({
                message: error.message
            })
        }
    )
}

exports.deleteOne = (req, res) =>{
    UserModel.findByIdAndRemove(req.params.id)
    .then((user) => {res.send(user)})
    .catch(
        (error) => {
            res.status(500).send({
                message: error.message
            })
        }
    )
}

exports.login = (req, res) =>{
    UserModel.findOne({email: req.body.email}, (error, dataUser) => {
        if(dataUser != null){
            if(dataUser.password == req.body.password){
                res.send({token: service.createToken(dataUser)})
            }else{
                res.status(400).send({
                    message: 'Los datos no coinciden'
                })
            }
        }else{
            res.status(400).send({
                message: 'Los datos no coinciden'
            })
        }
    })
}

exports.sendEmail = (req, res) =>{
    const email = req.query.email
    const name = req.query.name
    requirements(email, name, res)
}

const requirements = (email, name, res) =>{
    const contentEmail = `<h1> Mensaje desde el formulario de contacto </h1>
        Hola, hemos recibido un mensaje de ${name} con el correo ${email}, por favor comunicate.`
    sendEmailInfo(email, 'Formulario Contacto', contentEmail, '', res )
}

const sendEmailInfo = (receiver, subject, contentEmail, contentTxt = '', res) =>{
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ataraxiasalud@gmail.com',
            pass: '15141381malala5'
        }
    })

    const configEmail = {
        from: 'Keycode Book',
        to: receiver,
        subject: subject,
        text: contentTxt,
        html: contentEmail
    }

    transport.sendMail(configEmail, (error, info) =>{
        if(error){
            res.status(500).send({
                message: 'Error al enviar el correo', error
            })
        }else{
            res.status(200).send({
                message: 'Correo enviado correctamente'
            })
        }
    })
}