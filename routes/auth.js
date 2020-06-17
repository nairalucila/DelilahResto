const router = require("express").Router;
const rutasAut = router();

const {
  controladorRegistro,
  checkMiddleware,
} = require("../controllers/autorizacion/registro");

const controladorLogin = require("../controllers/autorizacion/login");

rutasAut.post("/registro", checkMiddleware, controladorRegistro);

rutasAut.post("/login", controladorLogin);

module.exports = rutasAut;
