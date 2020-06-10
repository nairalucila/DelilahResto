module.exports = (sequelize, type) => {
  return sequelize.define("pedidos", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },
    
    usuarioId: {
      type: type.INTEGER,
      notNull: true,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },

    platoId: {
      type: type.INTEGER,
      notNull: true,
      references: {
        model: 'platos',
        key: 'id'
      }
    },

    fecha: {
      type: type.DATE,
      notNull: true
    },
    cantidad: {
      type: type.INTEGER,
      notNull: true,
    },
    total: {
      type: type.INTEGER,
      notNull: true,
    },
  });
};

