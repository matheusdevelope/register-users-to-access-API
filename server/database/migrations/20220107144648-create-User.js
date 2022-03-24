module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User", {
      _id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiration_files: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      allow_access: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("User");
  },
};
