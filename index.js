const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const jwt = require('jsonwebtoken');
const secreto = "A2dvWGM46yeAe9G";

const {Plato} = require("./db")
const {Usuario} = require("./db")
const {Pedido} = require("./db");
const platos = require("./models/platos");


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
   res.json({Usuario});
 
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

app.post("/carrito", async (req, res) => {
  await res.json({success: 'carrito'})
 
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

//////// PLATOS

app.get("/explorador", async (req, res) => {
  
  const platos = await Plato.findAll();
  res.json(platos);
 

});

app.post("/crearplatos", (req, res)=>{

 const plato = req.body;
  if (!plato) {
    
    return res.status(400).send("Bad request");
   }
   db.Plato.create(plato)

     .then(() => res.send("Plato creado exitosamente"))
     .catch(() => res.status(500).send("Error al crear plato"));
 });


 app.delete("/:platosId", async (req, res)=>{

  await Plato.destroy({
    where: {id: req.params.platosId}
  });

  res.json({success: 'Borrado exitosamente'}); 
 
 });


   
//SERVIDOR

app.listen(3000, () => {
  console.log("servidor funcionando");
});
