const Sequelize = require('sequelize');

//Importé la tabla usuario
const usuariosModelo = require('./models/usuarios')

const sequelize = new Sequelize('Q2gfbSmPW3', 'Q2gfbSmPW3', 'C8eE5Isasu', {
  host: 'remotemysql.com',
  dialect: 'mysql'
});



//Aca nose que que hice pero se tiene que hacer
const Usuario = usuariosModelo(sequelize, Sequelize);

sequelize.sync({force: false})
.then(()=>{
  console.log('Tablas Sincronizadas')
})
.catch((err)=>console.log("error -->" , err));

// test db connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado exitosamente a la base de datos.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });


module.exports = {Usuario}; //exporte tabla usuario 