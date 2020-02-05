'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('entrega', 
    { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome_cliente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ponto_origem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ponto_destino: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_entrega: {
        type:  Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    }    
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('entrega');
  }
};
