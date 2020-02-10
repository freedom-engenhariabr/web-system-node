'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('funcoes',

      'nome',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      }
    );
  },

  down: (queryInterface) => {

    return queryInterface.removeColumn('funcoes', 'nome');
  }
};
