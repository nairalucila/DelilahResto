module.exports = (sequelize, type) => {
  return sequelize.define("platos", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },
    nombre: {
      type: type.STRING,
      notNull: true,
    },
    descripcion: {
      type: type.STRING,
      notNull: true,
    },
    precio: {
      type: type.INTEGER,
      notNull: true,
    },
    
  });
};

