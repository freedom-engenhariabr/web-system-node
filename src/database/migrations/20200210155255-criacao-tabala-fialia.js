'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('filiais',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        codigo: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
        empresa_id: {
          references: { model: 'empresas', key: 'id' },
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface) => {

    return queryInterface.dropTable('filiais');
  }
};
