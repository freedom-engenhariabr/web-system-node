'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'funcoes',
      'empresa_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'empresas', key: 'id' },
        onUpload: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    );

  },

  down: (queryInterface, ) => {

    return queryInterface.removeColumn('funcoes', empresa_id);

  }
};
