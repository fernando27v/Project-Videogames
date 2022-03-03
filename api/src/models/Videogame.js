const { DataTypes, Model, NOW} = require('sequelize');

module.exports = (sequelize) => {

  class Videogame extends Model {}


  Videogame.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    rating:{
        type: DataTypes.DECIMAL,
        defaultValue:0
    },
    released:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }


  }, {sequelize, timestamps: false})
};
