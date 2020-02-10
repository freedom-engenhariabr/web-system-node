'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('empresas',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        codigo: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ativo: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      },
      {
        freezeTableName: true
      });
  },

  down: (queryInterface) => {

    return queryInterface.dropTable('empresas');
  }
};
