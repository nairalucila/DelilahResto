module.exports = (sequelize, type) => {
  return sequelize.define("pedidos", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
    },
    
    usuarioId: {
      type: type.DATE,
      notNull: true,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
  // join junntar tablas
    platoId: {
      type: type.DATE,
      notNull: true,
      references: {
        model: 'platos',
        key: 'id'
      }
    },

    fecha: {
      type: type.DATE,
      allowNull: false
    },

    hora: {
      type: type.DATE(4),
      allowNull: false
    },

    cantidad: {
      type: type.INTEGER,
      notNull: true,
    },

    total: {
      type: type.INTEGER,
      notNull: true,
    },

    estado: {
      type: type.STRING,
      defaultValue: "Nuevo"
      
    },
    direccionEnvio: {
      type: type.STRING,
      notNull: false,
      references: {
        model: 'usuario',
        key: 'direccion_envio'
      }
    }
  });
};

