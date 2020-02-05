
import Sequelize, { Model } from 'sequelize';

class Entrega extends Model {

  static init(sequelize) {
    super.init(
      {
        nome_cliente: Sequelize.STRING,
        ponto_origem: Sequelize.STRING,
        ponto_destino: Sequelize.STRING,
        data_entrega: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

}

export default Entrega;