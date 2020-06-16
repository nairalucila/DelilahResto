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
  // join junntar tablas
    platoId: {
      type: type.INTEGER,
      notNull: true,
      references: {
        model: 'platos',
        key: 'id'
      }
    },

    fecha: {
      type: type.DATE(),
      notwNull: false,
      get() {
        return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY');
      }
    },

    hora: {
      type: type.DATE(),
      notwNull: false
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
    // direccionEnvio: {
    //   type: type.STRING,
    //   notNull: true,
    //   references: {
    //     model: 'usuarios',
    //     key: 'direccion_envio'
    //   }
    // }
  });
};

