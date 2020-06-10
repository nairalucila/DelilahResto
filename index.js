const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const jwt = require('jsonwebtoken');
const secreto = "A2dvWGM46yeAe9G";



//CONFIGURACION
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", (req, res) => {
  res.json(req.body);
});

//REGISTRO

//RUTAS

app.get("/", (req, res) => {

  //Traer todos
  db.Usuario.findAll({
    attributes: ["username"],
  })
    .then((usuarios) => {
      console.log("usuarios =>>> ", usuarios);
    })
    .catch((err) => {
      console.log("Error al traer el usuario", err);
    });

   
  //crear entrada en tabla
  // db.Usuario.create({
  //   username: 'ruperta',
  //   fullname: "rupertao garcia",
  //   email: "fulanescrrrrro@gmail.com",
  //   telefono: '351555823158',
  //   direccion_envio: "8 de mayo 123",
  //   contraseña: "fulanesco123"

  // }).then(()=>{
  //   console.log('creado el fulano');
  // })
  // .catch(()=>{
  //   console.log('error');

  // })

  res.send("Hola mundo");
});


//***falta contraseña */
app.post("/registro", (req, res) => {
  
  const newUser = req.body;
  if (!newUser) {
   return res.status(400).send("Bad request");
  }

  db.Usuario.create(newUser)
    .then(() => res.send("Usuario creado exitosamente"))
    .catch(() => res.status(500).send("Error en el servidor"));
});


//////////////////////////////////////////
app.get("/explorador", (req, res) => {
  res.send("Lista de  platos");
});

app.get("/carrito", (req, res) => {
  res.send("hamburguesa doble");
});


//app.post("/carrito", (req, res) => {

//   const newPedido = req.body;
//   if (!newPedido) {
//    return res.status(400).send("Bad request");
//   }

//   db.Pedido.create(newPedido)
//     .then(() => res.send("Usuario creado exitosamente"))
//     .catch(() => res.status(500).send("Error en el servidor"));
// });
  
//});

//SERVIDOR

app.listen(3000, () => {
  console.log("servidor funcionando");
});
