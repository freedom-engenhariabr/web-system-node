'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dispositivos',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
        filial_id: {
          type: Sequelize.INTEGER,
          references: { model: 'filiais', key: 'id' },
          allowNull: false,
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('dispositivos');
  }
};
