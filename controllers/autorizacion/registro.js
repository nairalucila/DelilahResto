const bcrypt = require("bcryptjs");
const { validationResult , check} = require("express-validator");
const { Usuario } = require("../../db");

const controladorRegistro = (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).json({ errores: errors.array() });
  }

  req.body.contraseña = bcrypt.hashSync(req.body.contraseña, 5);

  const newUser = req.body;

  if (!newUser) {
    res.status(400).send("Bad request");
  }
  Usuario.create(newUser)
    .then(() => res.status(200).send("Usuario creado exitosamente"))
    .catch((err) =>
      res.status(500).json({
        errors: {
          mensaje: err.errors[0].message,
          campo: err.fields,
        },
      })
    );
};

const checkMiddleware = [
  check("contraseña", "Disculpe, la contraseña es obligatoria").not().isEmpty(),
  check("email", "El email es obligatorio").not().isEmpty(),
];

module.exports = { controladorRegistro, checkMiddleware };
