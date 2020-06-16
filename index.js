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

//CONFIGURACION
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  res.json(req.body);
});

const checkToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (typeof token !== "undefined") {

    jwt.verify(token, secreto, (err, authorizedData) => {
      if (err) {
        console.log(err, "SUPER ERROR ACÁ");
        res.sendStatus(403);
      } else {
        next();
      }
    });
  } else {
    res.status(403).send("No autorizado");
  }
};

//RUTAS USUARIOS

app.get("/usuarios", checkToken, async (req, res) => {
  jwt.verify(req.token, secreto, (err, authorizedData) => {
    if (err) {
      console.log(errr, "SUPER ERROR ACÁ");
      res.sendStatus(403);
    } else {
      res.json({
        message: "Exitoso login",
        authorizedData,
      });
      console.log("EXITO, conectado");
    }
  });

  //////////
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

app.get("/usuarios/:id",checkToken,  async (req, res) => {
  const usuario = await Usuario.findOne({ where: { id: req.params.id } });
  if (usuario === null) {
    res.json({ success: "not found" });
    console.log("Not found!");
  } else {
    res.json({ success: "oookkk", data: usuario });
  }
});

app.post(
  "/registro",
  [
    check("contraseña", " Tiiooooo La contraseña es obligatoria")
      .not()
      .isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
  ],
  (req, res) => {
    //veeeer si sirve
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errores: errors.array() });
    }

    req.body.contraseña = bcrypt.hashSync(req.body.contraseña, 5);

    const newUser = req.body;

    if (!newUser) {
      res.status(400).send("Bad request");
    }
    db.Usuario.create(newUser)
      .then(() => res.status(200).send("Usuario creado exitosamente"))
      .catch((err) =>
        res.status(500).json({
          errors: {
            mensaje: err.errors[0].message,
            campo: err.fields,
          },
        })
      );
  }
);

app.post("/login", (req, res) => {
  const { body } = req;
  const { email } = body;
  const { contraseña } = body;

  // buscar ese usuario en la base de datos
  Usuario.findOne({
    where: { email: email },
  })
    // si el usuario existe desencriptar la contraseña y compararla con la q manda
    .then((usuarioDB) => {
      if (usuarioDB) {
        bcrypt.compare(contraseña, usuarioDB.contraseña, (err, result) => {
          // result == true
          if (err) {
            return res.json({ err });
          }

          if (result) {
            jwt.sign({ email }, secreto, (err, token) => {
              if (err) {
                console.log("ERROR EN SIGN", err);

                return res.json({ err });
              }

              return res.send(token);
            });
          }
        });
      } else {
        return res.json("otro error más").status(403);
      }
    })
    .catch((errorsito) => {
      return res.status(500).send(errorsito);
    });
  // si no exuste el usuario error

  // si la contraseña no coincide error
  // return res.status(400).send("Error");
  // si hay un error al buscar usuario error en base de datos
});

/////////////////////////////////////////////////////////////////////////////////////////////

app.delete("/eliminarregistro/:id", async (req, res) => {
  await db.Usuario.destroy({
    where: { id: req.params.id },
  });
  res.json({ success: "Usuario borado" });
});

//////// PLATOS

app.get("/explorador", checkToken, async (req, res) => {
  const platos = await Plato.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
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
