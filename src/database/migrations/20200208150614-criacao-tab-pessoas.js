'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pessoas',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
        cpf: {
          type: Sequelize.BIGINT,
          allowNull: false,
          unique: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        data_nascimento: {
          type: Sequelize.DATEONLY
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('pessoas');
  }
};
