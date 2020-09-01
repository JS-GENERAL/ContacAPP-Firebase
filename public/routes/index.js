const { Router } = require('express');  // importar el enrutador de express
const app = require('../app');
const router = Router();  // ejecutarlo y guardarlo en una constante
const admin = require('firebase-admin');

var serviceAccount = require('../../contacto-app-b7f8d-firebase-adminsdk-e38h7-513dbe5110.json');
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:'https://contacto-app-b7f8d.firebaseio.com/'
}); // inicializa firebase (cadena de conexion)

const db = admin.database(); //conectarse a la base de datos


router.get('/', (req, res) =>{
  // renderizar a la vista principal
        db.ref('contactos').once('value',(snapshot) =>{
           const data = snapshot.val();
           res.render('index',{contactos:data});
        });
        
});


router.post('/nuevoContacto',(req,res) =>{
    const nuevoContacto = {
        primerNombre:req.body.primerNombre,
        apellido:req.body.apellido,
        email:req.body.email,
        telefono:req.body.telefono
    }
    //console.log(nuevoContacto);
    db.ref('contactos').push(nuevoContacto);//crea una coleccion y guarda lo que le mandan por el formulario
    //res.send('Contacto Recibido');
    res.redirect('/'); //Redirecciona a la ruta inicial
})


router.get('/eliminarContacto/:id',(req,res)=>{
   db.ref('contactos/' + req.params.id).remove();
   res.redirect('/'); //Redirecciona a la ruta inicial
});


module.exports = router;
