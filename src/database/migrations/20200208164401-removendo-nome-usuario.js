'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('usuarios', 'nome');
  },

  down: (queryInterface) => {

    return queryInterface.removeColumn('usuarios', nome);
  }
};
