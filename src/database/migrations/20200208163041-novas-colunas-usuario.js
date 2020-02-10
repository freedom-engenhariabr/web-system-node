'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('usuarios',
      'pessoa_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'pessoas', key: 'id' },
        onUpload: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    );

  },

  down: (queryInterface, ) => {

    return queryInterface.removeColumn('usuarios');

  }
};
