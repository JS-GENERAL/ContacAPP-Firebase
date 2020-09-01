const express = require('express'); //servidor web
const morgan = require('morgan'); // registrar peticiones http
const exphbs = require('express-handlebars'); //sistema de plantillas html
const path = require('path'); // permite trabajar con directorios

const app = express(); 

//confiruaciones
app.set('port',process.env.PORT || 3000); //si hay un puerto configurado en la maquina tomalo, sino ocupa el 3000
app.set('views',path.join(__dirname,'views'));//saca la ruta absoluta del equipo y la combina con views del proyecto
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    extname:'.hbs'
}));
app.set('view engine','.hbs');//en engine se configura el motor de la plantilla y en esta linea se asigna



//midlewares
app.use(morgan('dev')); // ejecutar morgan en modo de desarrollo
app.use(express.urlencoded({extended:false}));  // aceptar formularios html, false:solo acepta formularios en formato json


// rutas
app.use(require('./routes/index'));

//archivos estaticos
app.use(express.static(path.join(__dirname,'public'))); // le indica a la aplicacion donde esta la carpeta public


module.exports = app; // ejecutar el modulo