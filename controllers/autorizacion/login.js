const { Usuario } = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const secreto = "A2dvWGM46yeAe9G";


const controladorLogin = (req, res) => {
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
                return res.json({ err });
              }
              
              return res.send(token);
            });
          } else {
            return res.send("Contraseña incorrecta");
          }
        });
      } else {
        return res.json("otro error más").status(403);
      }
    })
    .catch((error) => {
        return res.status(500).send(error);
      });
  }

module.exports = controladorLogin;