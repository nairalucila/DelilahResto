const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const jwt = require('jsonwebtoken');
const secreto = "A2dvWGM46yeAe9G";

const {Plato} = require("./db")
const {Usuario} = require("./db")


//CONFIGURACION
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", (req, res) => {
  res.json(req.body);
});

//REGISTRO

//RUTAS

//aca no trare nada
app.get("/inicio", async (req, res) => {
//falta try y catch


  await db.Usuario.findAll();
   res.json();
 
});

///   BORRAR TABLAS PHP MYADMNN

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


//});


//esto anda bien
app.delete("/registro/:id", async (req, res)=> {

  await db.Usuario.destroy ({

    where: {id: req.params.id}

  });
  res.json({success: 'exito borrado'});
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


app.post("/carrito", (req, res) => {

//   const newPedido = req.body;
//   if (!newPedido) {
//    return res.status(400).send("Bad request");
//   }

//   db.Pedido.create(newPedido)
//     .then(() => res.send("Usuario creado exitosamente"))
//     .catch(() => res.status(500).send("Error en el servidor"));
// });
  
});

//ADMINISTRADOR

app.post("/platos", (req, res)=>{

  const nuevoPlato = req.body;
  if (!nuevoPlato) {
   return res.status(400).send("Bad request");
  }

  db.Plato.create(nuevoPlato)
    .then(() => res.send("creado exitosamente"))
    .catch(() => res.status(500).send("Error en el servidor"));

});

app.get("/explorador", async (req, res) => {
  
  await db.Plato.findAll();
  res.json(platos);
 

})

//SERVIDOR

app.listen(3000, () => {
  console.log("servidor funcionando");
});
