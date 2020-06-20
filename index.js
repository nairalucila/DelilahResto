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
const controladores = require("./controllers/autorizacion/login");

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
    res.json({ success: "OK", data: usuario });
  }
});

app.delete("/usuarios/:id", checkToken, esAdmin, async (req, res) => {
  await db.Usuario.destroy({
    where: { id: req.params.id },
  });
  res.json({ success: "Usuario BORRADO" });
});

app.put("/usuarios/:id", checkToken, esAdmin, async (req, res) => {
  const updateid = req.params.id;
  Usuario.update(
    {
      nombreUsuario: req.body.nombreUsuario,
      nombreCompleto: req.body.nombreCompleto,
      tel: req.body.tel,
      direccion_envio: req.body.direccion_envio,
      contraseña: req.body.contraseña,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("Usuario ACTUALIZADO con éxito");
  });
});

app.use("/", rutasAut);
/////////////////////////////////////////////////////////////////////////////////////////////

//////// PLATOS

app.get("/platos", checkToken, async (req, res) => {
  const platos = await Plato.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json(platos);
});

app.post("/platos", checkToken, esAdmin, (req, res) => {
  const plato = req.body;
  if (!plato) {
    return res.status(400).send("Bad request");
  }
  db.Plato.create(plato)

    .then(() => res.send("Plato CREADO exitosamente"))
    .catch(() => res.status(500).send("Error al crear plato"));
});

app.delete("/platos/:id", checkToken, esAdmin, async (req, res) => {
  await Plato.destroy({
    where: { id: req.params.id },
  });

  res.json({ success: "Plato ELIMINADO exitosamente" });
});

app.put("/platos/:id", checkToken, esAdmin, async (req, res) => {
  const updateid = req.params.id;
  Plato.update(
    {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("Plato ACTUALIZADO con éxito");
  });
});

///////////////////// PEDIDOS

app.get("/pedidos", checkToken, async (req, res) => {
  const usuarioDB = await Usuario.findOne({
    where: { email: req.usuario.email },
  });

  if (usuarioDB.esAdministrador) {
    const traertodo = await Pedido.findAll({
      include: [
        {
          model: Plato,
          required: true,
        },
      ],
    });
    res.json(traertodo);
  } else {
    const traerotravez = await Pedido.findAll({
      where: { usuarioId: usuarioDB.id },
    });
    console.log(traerotravez, "<----- RES");
    res.json(traerotravez);

    //buscas pedidos donde id relacionado  a usuaros en tabla pedidos = a usuarioDB.id
  }
});

app.post("/pedidos", checkToken, (req, res) => {
  const newPedido = req.body;

  if (!newPedido) {
    return res.status(400).send("Bad request");
  }

  newPedido.fecha = new Date().toLocaleDateString("es-AR");
  newPedido.hora = new Date().getHours() + ":" + new Date().getMinutes();

  db.Pedido.create(newPedido)

    .then(() => res.send("Pedido CREADO exitosamente"))
    .catch((err) => res.status(500).send(err, "Error al crear su pedido"));
});

app.delete("/pedidos/:id", checkToken, esAdmin, async (req, res) => {
  await Pedido.destroy({
    where: { id: req.params.id },
  });

  res.json({ success: "Pedido ELIMINADO exitosamente" });
});

app.put("/pedidos/:id", checkToken, esAdmin, (req, res) => {
  const updateid = req.params.id;

  Pedido.update(
    {
      usuarioId: req.body.usuarioId,
      platoId: req.body.platoId,
      // fecha: req.body.DATE(),
      // hora: req.body.DATE(),
      cantidad: req.body.cantidad,
      total: req.body.total,
      estado: req.body.estado,
    },

    { where: { id: req.params.id } }
  )
  .then(() => {
    res.status(200).send("Pedido ACTUALIZADO con éxito");
  });
});
//SERVIDOR

app.listen(3000, () => {
  console.log("servidor funcionando");
});
