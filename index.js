const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const jwt = require("jsonwebtoken");
const secreto = "A2dvWGM46yeAe9G";
const bcrypt = require("bcryptjs");

const { check, validationResult } = require("express-validator");

const { Plato } = require("./db");
const { Usuario } = require("./db");
const { Pedido } = require("./db");
const platos = require("./models/platos");
const moment = require("moment");
const controladores = require('./controllers/autorizacion/login');

const rutasAut = require("./routes/auth");

//CONFIGURACION
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (typeof token !== "undefined") {
    jwt.verify(token, secreto, (err, authorizedData) => {
      if (err) {
        console.log(err, "SUPER ERROR ACÁ");
        res.sendStatus(403);
      } else {
        req.usuario = authorizedData;
        next();
      }
    });
  } else {
    res.status(403).send("No autorizado");
  }
};

const esAdmin = (req, res, next) => {
  console.log("req -->", req.usuario);

  Usuario.findOne({
    where: { email: req.usuario.email },
  })
    .then((usuarioDB) => {
      if (usuarioDB.esAdministrador) {
        next();
      } else {
        res.json("No autorizado, debe ser administrador").status(500);
      }
    })
    .catch((err) => res.send("Error en el servidor"));
};

//RUTAS USUARIOS

app.get("/usuarios", checkToken, esAdmin, async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where: {
        esAdministrador: false,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "esAdministrador"] },
    });

    res.json(usuarios);
  } catch (error) {
    res.json({ error: error });
  }
});

app.get("/usuarios/:id", checkToken, esAdmin, async (req, res) => {
  const usuario = await Usuario.findOne({ where: { id: req.params.id } });
  if (usuario === null) {
    res.json({ success: "True ", usuario });
    console.log("Not found!");
  } else {
    res.json({ success: "oookkk", data: usuario });
  }
});

app.delete("/eliminarregistro/:id", checkToken, esAdmin, async (req, res) => {
  await db.Usuario.destroy({
    where: { id: req.params.id },
  });
  res.json({ success: "Usuario borrado" });
});

app.put('/actualizarusuario/:id', checkToken, esAdmin, async (req,res)=>{
  const updateid = req.params.id;
    Usuario.update(
      {  
      nombreUsuario: req.body.nombreUsuario,
      nombreCompleto: req.body.nombreCompleto,
      tel: req.body.tel,
      direccion_envio: req.body.direccion_envio,
      contraseña: req.body.contraseña
     }, {where: {id:req.params.id}}
             ).then(() => {
             res.status(200).send("Usuario actualizado con éxito");
             });
})


app.use("/", rutasAut);



/////////////////////////////////////////////////////////////////////////////////////////////



//////// PLATOS

app.get("/platos", checkToken, async (req, res) => {
  const platos = await Plato.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json(platos);
});

app.post("/crearplato", checkToken, esAdmin, (req, res) => {
  const plato = req.body;
  if (!plato) {
    return res.status(400).send("Bad request");
  }
  db.Plato.create(plato)

    .then(() => res.send("Plato creado exitosamente"))
    .catch(() => res.status(500).send("Error al crear plato"));
});

app.delete("/eliminarplato/:id", checkToken, esAdmin, async (req, res) => {
  await Plato.destroy({
    where: { id: req.params.id },
  });

  res.json({ success: "Plato eliminado exitosamente" });
});

app.put('/actualizarplato/:id', checkToken, esAdmin, async (req,res)=>{
  const updateid = req.params.id;
    Plato.update(
      {  
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      
     }, {where: {id:req.params.id}}
             ).then(() => {
             res.status(200).send("Plato actualizado con éxito");
             });
})

///////////////////// PEDIDOS

app.post("/crearpedidos", checkToken, (req, res) => {
  const newPedido = req.body;
  if (!newPedido) {
    return res.status(400).send("Bad request");
  }

  db.Pedido.create(newPedido)
    .then(() => res.send("PEDIDO creado exitosamente"))
    .catch((err) => res.status(500).send(err, "Error al crear su pedido"));
});

//SERVIDOR

app.listen(3000, () => {
  console.log("servidor funcionando");
});
