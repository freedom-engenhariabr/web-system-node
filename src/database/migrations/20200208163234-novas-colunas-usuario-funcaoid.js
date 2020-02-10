'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('usuarios',
      'funcao_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'funcoes', key: 'id' },
        onUpload: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      });
  },

  down: (queryInterface) => {
    return queryInterface.removeColun('usuarios', 'funcao_id');
  }
};
