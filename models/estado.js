module.exports = (sequelize, type) => {
    return sequelize.define("estados", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true,
      },
      nuevo: {
        type: type.STRING,
        defaultValue: 'Nuevo',
      },
      preparando: {
        type: type.STRING,
        defaultValue: 'Preparando',
      },
      enviado: {
        type: type.STRING,
        defaultValue: 'Enviado',
      },
      
      entregado: {
        type: type.STRING,
        defaultValue: 'Entregado',
      },

      cancelado: {
        type: type.STRING,
        defaultValue: 'Cancelado',
      },
      
    });
  
  };
  