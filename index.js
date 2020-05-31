const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const db = require('./db');

//CONFIGURACION
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/', (req, res) => {
    res.json(req.body);
  })

 //REGISTRO

//RUTAS

app.get('/', (req, res)=>{

  // traer todos
  //db.Usuario.findAll()

  // crear entrada en tabla
  // db.Usuario.create({
  //   username: 'Fulano123',
  //   fullname: "fulano garcia",
  //   email: "fulanesco@gmail.com",
  //   telefono: '351555858',
  //   direccion_envio: "8 de mayo 123",
  //   contraseña: "fulanesco123"

  // }).then(()=>{
  //   console.log('creado el fulano');
  // })
  // .catch(()=>{
  //   console.log('error');

  // })
    res.send('Hola mundo');
});



app.get('/explorador', (req, res)=>{

  res.send('Lista de  platos');

});



app.get('/carrito', (req, res) =>{

  res.send('hamburguesa doble')
});




//SERVIDOR

app.listen(3000, () =>{
 console.log('servidor funcionando');
});