'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.User , {foreignKey : "userId"})
    }
  }
  Image.init({
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "imgUrl is required",
            },
            notEmpty: {
                msg: "imgUrl is required",
            },
        },
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "userid is required",
            },
            notEmpty: {
                msg: "userid is required",
            },
        },
    },
    prompt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
