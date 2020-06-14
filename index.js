const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const jwt = require("jsonwebtoken");
const secreto = "A2dvWGM46yeAe9G";

const { Plato } = require("./db");
const { Usuario } = require("./db");
const { Pedido } = require("./db");
const platos = require("./models/platos");

//CONFIGURACION
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", (req, res) => {
  res.json(req.body);
});

//RUTAS USUARIOS

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where:{
        esAdministrador: false
      },
      attributes: {exclude: ['createdAt', 'updatedAt', 'esAdministrador']}
      
    });

    res.json(usuarios)


  } catch (error) {
    res.json({ error: error });
  }
});

app.get("/usuarios/:id", async (req, res) => {
  const usuario = await Usuario.findOne({ where: { id: req.params.id } });
  if (usuario === null) {
    res.json({ success: "not found" });
    console.log("Not found!");
  } else {
    res.json({ success: "oookkk", data: usuario });
  }
});


app.post("/registro", (req, res) => {
  const newUser = req.body;

  if (!newUser) {
    res.status(400).send("Bad request");
  }
  db.Usuario.create(newUser)
    .then(() => res.send("Usuario creado exitosamente").status(200))
    .catch((err) => res.status(500).send(err, "Error en el servidor"));
});

app.delete("/eliminarregistro/:id", async (req, res) => {
  await db.Usuario.destroy({
    where: { id: req.params.id },
  });
  res.json({ success: "Usuario borado" });
});


//////// PLATOS

app.get("/explorador", async (req, res) => {
  const platos = await Plato.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']}
  });
  res.json(platos);

});

app.post("/crearplatos", (req, res) => {
  const plato = req.body;
  if (!plato) {
    return res.status(400).send("Bad request");
  }
  db.Plato.create(plato)

    .then(() => res.send("Plato creado exitosamente"))
    .catch(() => res.status(500).send("Error al crear plato"));
});

app.delete("/eliminarplatos/:id", async (req, res) => {
  await Plato.destroy({
    where: { id: req.params.id },
  });

  res.json({ success: "Plato eliminado exitosamente" });
});

///////////////////// PEDIDOS

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

// traeme los platos para q use en la tabla , /platos-tabla , funcion con la consulta
// que traiga

//SERVIDOR

app.listen(3000, () => {
  console.log("servidor funcionando");
});
