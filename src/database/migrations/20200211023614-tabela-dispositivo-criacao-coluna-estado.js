'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'dispositivos',
      'estado',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    );
  },

  down: (queryInterface) => {

    return queryInterface.removeColumn('dispositivos', 'estado');
  }
};
