const app = require('./app');


app.listen(app.get('port')); // toma el puerto del archivo app.js

//netstat -ano | findstr :3000    -- BUSCA TODOS LOS PUERTOS Y EL DE ABAJO LOS MATA
//tskill typeyourPIDhere 


console.log(`Aplicacion Corriendo En puerto ${app.get('port')}`);

