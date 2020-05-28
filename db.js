const Sequelize = require('sequelize');

const sequelize = new Sequelize('Delilah_db', 'admin', 'Naira1193!', {
  host: 'localhost',
  dialect: 'mysql'
});

// test db connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado exitosamente a la base de datos.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = {sequelize};