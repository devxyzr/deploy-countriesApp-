const { sequelize, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true, // No se pone unique, ya que la primaryKey es unique
      allowNull: false, // Allow Null  hace referencia a valores que no pueden quedar vacios
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    flag_image: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    continent: {
      // type: DataTypes.ARRAY(DataTypes.STRING),
      // allowNull: false,
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      // type: DataTypes.ARRAY(DataTypes.STRING),
      // allowNull: false,
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
