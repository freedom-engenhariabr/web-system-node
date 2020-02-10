'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('empresas',
      'cnpj',
      {
        type: Sequelize.STRING,
        allowNUll: false,
        unique: true
      }
    );
  },

  down: (queryInterface) => {

    return queryInterface.removeColun('empresas', 'cnpj');
  }
};
