module.exports = (sequelize, type) => {
return sequelize.define('usuarios', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true

      },

      username: {
        type: type.STRING,
        notNull: true

      },

      fullname: {
        type: type.STRING,
        notNull: true

      },

      email: {
        type: type.STRING,
        isEmail: true,
        notNull: true


      },

      tel: {
        type: type.INTEGER,
        notNull: true,

      },
      direccion_envio: {

        type: type.STRING,
        notNull: true
      },

      contraseña: {
        type: type.STRING,
        notNull: true,
        isAlphanumeric: true
       
  }

})
}