'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('funcoes', 'codigo');
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('funcoes',
      'codigo',
      {
        type: Sequelize.STRING,
        allowNulL: true,
        unique: false
      });
  }
};
