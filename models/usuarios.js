module.exports = (sequelize, type) => {
  return sequelize.define('usuario', {
    id:{
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: type.STRING,
    description

  })
}