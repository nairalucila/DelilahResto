const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

//Importar la tabla usuario
const usuariosModelo = require("./models/usuarios");
const platoModelo = require("./models/platos");
const pedidoModelo = require("./models/pedidos");
const platos = require("./models/platos");

const sequelize = new Sequelize("Q2gfbSmPW3", "Q2gfbSmPW3", "C8eE5Isasu", {
  host: "remotemysql.com",
  dialect: "mysql",
});

//Aca nose que que hice pero tiene que hacerse
const Usuario = usuariosModelo(sequelize, Sequelize);
const Plato = platoModelo(sequelize, Sequelize);
const Pedido = pedidoModelo(sequelize, Sequelize);

Plato.hasMany(Pedido);
Pedido.belongsTo(Plato);
Usuario.hasMany(Pedido);
Pedido.belongsTo(Usuario);



const crearPlatos = () => {
  console.log("crear plato --");
  Plato.findOne({
    where: {
      id: 1,
    },
  })
    .then((plato) => {
      if (!plato) {
        Plato.create({
          nombre: "Empanadas",
          fullname: "Admin",
          descripcion: "árabes",
          precio: "210",
        })

          .then(() => console.log("Plato creado exitosamente"))
          .catch((errorPlato) =>
            console.log(errorPlato, "Error al crear su Plato")
          );
      }
    })
    .catch((err) => console.log("Error al buscar plato --->", err));
};

const createAdmin = () => {
  const hashContraseña = bcrypt.hashSync("Admin:123", 5);

  const admin = Usuario.findOne({
    where: {
      email: "admin@gmail.com",
    },
  })
    .then((admin) => {
      if (!admin) {
        Usuario.create({
          nombreUsuario: "Admin",
          nombreCompleto: "Admin",
          email: "admin@gmail.com",
          tel: "351000000",
          direccion_envio: "ninguna",
          contraseña: hashContraseña,
          esAdministrador: true,
        })
          .then(() => console.log("Usuario creado exitosamente"))
          .catch(() => console.log("Error en el servidor"));
      }
    })
    .catch((err) => {
      console.error("Uppsi");
    });
};

const buscarPedidos = () => {
  Pedido.findAll({
    include: [
      {
        model: Plato,
        required: true,
        attributes: ["descripcion"],
      },
      {
        model: Usuario,
        required: true,
        attributes: ["direccion_envio"],
      },
    ],
  })
    .then((res) =>
      console.log("Resultado --->", JSON.stringify(res, null, 2))
    )
    .catch((err) => console.error("Error al buscar pedidos ", err));
};

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
crearPlatos();


module.exports = { Usuario, Plato, Pedido}; //exporte tabla usuario
