const Sequelize = require('sequelize');

//Importé la tabla usuario
const usuariosModelo = require('./models/usuarios')

const sequelize = new Sequelize('delilahdb', 'id12407019_nairacoppari', '1193118596delilahdb', {
  host: 'https://databases.000webhost.com/?_ga=2.222333406.432021880.1590891063-97679544.1590891063',
  dialect: 'mysql'
});

// delilahdb  1193118596delilahdb

//Aca nose que que hice pero se tiene que hacer
const Usuario = usuariosModelo(sequelize, Sequelize);

sequelize.sync({force: false})
.then(()=>{
  console.log('Tablas Sincronizadas')
})
.catch((err)=>console.log("error -->" , err));

// test db connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Conectado exitosamente a la base de datos.');
//   })
//   .catch(err => {
//     console.error('No se pudo conectar a la base de datos:', err);
//   });


module.exports = {Usuario}; //exporte tabla usuario 