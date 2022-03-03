const {DataTypes,Model} = require('sequelize')

module.exports = (sequelize) => {

  class Platform extends Model {}


  Platform.init({
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