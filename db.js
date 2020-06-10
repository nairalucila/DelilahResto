const Sequelize = require("sequelize");

//Importé la tabla usuario
const usuariosModelo = require("./models/usuarios");
const platoModelo = require("./models/platos");
const pedidoModelo = require("./models/pedidos");



const sequelize = new Sequelize("Q2gfbSmPW3", "Q2gfbSmPW3", "C8eE5Isasu", {
  host: "remotemysql.com",
  dialect: "mysql",
});

//Aca nose que que hice pero se tiene que hacerse
const Usuario = usuariosModelo(sequelize, Sequelize);
const Plato = platoModelo(sequelize, Sequelize);
const Pedido = pedidoModelo(sequelize, Sequelize);
//const Estado = estadoModelo (sequelize, Sequelize);



const createAdmin = () => {
  const admin = Usuario.findOne({
    where: {
      email: "admin@gmail.com",
    },
  })
    .then((admin) => {
      if (!admin) {
        Usuario.create({
          username: "Admin",
          fullname: "Admin",
          email: "admin@gmail.com",
          telefono: "351000000",
          direccion_envio: "ninguna",
          contraseña: "Admin:123",
          // esAdministrador: true,
        })
          .then(() => console.log("Usuario creado exitosamente"))
          .catch(() => console.log("Error en el servidor"));
      }
    })
    .catch((err) => {
      console.error("Uppsi");
    });
};


Usuario.hasMany(Pedido);
Plato.hasMany(Pedido);


sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tablas Sincronizadas");
  })
  .catch((err) => console.log("error -->", err));

// test db connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado exitosamente a la base de datos.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });

createAdmin();

module.exports = { Usuario, Plato, Pedido }; //exporte tabla usuario
