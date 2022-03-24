const { Model, DataTypes } = require("sequelize");

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        _id: DataTypes.STRING,
        user: DataTypes.STRING,
        pass: DataTypes.STRING,
        access: DataTypes.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
  }
  static associate(models) {}
}

module.exports = Client;
