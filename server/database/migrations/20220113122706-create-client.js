"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Client", {
      _id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      user: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      pass: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      access: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Client");
  },
};
