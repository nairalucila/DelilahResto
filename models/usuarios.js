module.exports = (sequelize, type) => {
  return sequelize.define("usuarios", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },
    nombreUsuario: {
      type: type.STRING,
      notNull: true,
    },
    nombreCompleto: {
      type: type.STRING,
      notNull: true,
    },
    email: {
      type: type.STRING,
      isEmail: true,
      notNull: true,
      unique: true,
    },
    tel: {
      type: type.STRING,
      notNull: true,
    },
    direccion_envio: {
      type: type.STRING,
      notNull: true,
    },
    contraseña: {
      type: type.STRING,
      notNull: true,
      
    },
    esAdministrador: {
      type: type.BOOLEAN,
      notNull: true,
      defaultValue: false
      
    },
  });

};

