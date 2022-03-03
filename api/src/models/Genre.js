const {DataTypes,Model} = require('sequelize')

module.exports = (sequelize) => {

  class Genre extends Model {}


  Genre.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }

  }, {sequelize, timestamps: false})
};