const mongoose = require('mongoose'); //Paquete que permite la comunicacion con nuestra bd 
const config = require('./config');
// metodo conect en mongoose => Permite conectarse a una bd tiene unas opciones que son: 
const conectDB = () =>{
    //useNewUrlParser: Analizar la información que se le quiere enviar a mongoDB.
    //  useUnifiedTopology: Escuchar los llamados que hacemos a mongoDB y monitorea que es lo pasa.
  //  mongoose.connect('mongodb+srv://luna:luna@luna.ke4jj.mongodb.net/KeyCodeBook?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true }, (error) =>{
    mongoose.connect('mongodb://AdminSammy:sammy@127.0.0.1:27017/admin?tls=false&authMechanism=SCRAM-SHA-1&authSource=admin&replicaSet=rs01', {useNewUrlParser: true, useUnifiedTopology: true }, (error) =>{
         
  if(error){
            console.log('Error:' , error);
        }else{
            console.log('Nos conectamos a la bd');
        }
    })
}
// Nos permite exportar una funcion para que pueda ser utilizada en otra parte de nuestro proyecto
module.exports = {conectDB}