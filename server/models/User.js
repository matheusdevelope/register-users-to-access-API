const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        _id: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        name: DataTypes.STRING,
        expiration_files: DataTypes.NUMBER,
        allow_access: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
  }
  static associate(models) {}
}

module.exports = User;
