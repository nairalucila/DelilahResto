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


const crearPlatos = () => {
  const plato = Plato.findOne({
    where: {
      id: 1,
    },
  })
  
 if(!plato){
  Plato.create({
    nombre: "Empanadas",
    fullname: "Admin",
    descripcion: "árabes",
    precio: "210"
    
  })

    .then(() => console.log("Plato creado exitosamente"))
    .catch((errorPlato) => console.log(errorPlato, "Error al crear su Plato"));

};
}
//crearPlatos();


const createAdmin = () => {
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
