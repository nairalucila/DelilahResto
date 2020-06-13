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



//RUTAS

app.get("/inicio", async (req, res) => {
  //aca trae un objeto vacio


  await db.Usuario.findAll();
   res.json({Usuario});
 
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


//});


//esto anda bien

   

//***falta contraseña */
app.post("/registro", (req, res) => {
  
  const newUser = req.body;
  
   if (!newUser) {
   res.status(400).send("Bad request");
  }   
  db.Usuario.create(newUser)
    .then(() => res.send("Usuario creado exitosamente").status(200))
    .catch((err) => res.status(500).send(err, "Error en el servidor"));
});



app.delete("/eliminarregistro/:id", async (req, res)=> {

  await db.Usuario.destroy ({

    where: {id: req.params.id}

  });
  res.json({success: 'Usuario borado'});
});

//////////////////////////////////////////



app.post("/carrito", (req, res) => {

  const newPedido = req.body;
  if (!newPedido) {
   return res.status(400).send("Bad request");
  }

  db.Pedido.create(newPedido)
    .then(() => res.send("PEDIDO creado exitosamente"))
    .catch((err) => res.status(500).send(err, "Error al crear su pedido"));
});


// app.get('')
  


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
