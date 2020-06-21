const jwt = require("jsonwebtoken");
const secreto = "A2dvWGM46yeAe9G";
const { Usuario } = require("../db");


const checkToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (typeof token !== "undefined") {
    jwt.verify(token, secreto, (err, authorizedData) => {
      if (err) {
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

  Usuario.findOne({
    where: { email: req.usuario.email },
  })
    .then((usuarioDB) => {
      if (usuarioDB.esAdministrador) {
        next();
      } else {
        res.json("No autorizado, debe ser administrador").status(400);
      }
    })
    .catch((err) => res.send("Error en el servidor"));
};

module.exports = { checkToken, esAdmin };
