'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('usuarios',
      'senha_hash',
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    );
  },

  down: (queryInterface) => {

    return queryInterface.removeColumn('usuarios', 'senha_hash');
  }
};
