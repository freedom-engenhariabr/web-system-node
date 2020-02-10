import Sequelize, { Model } from 'sequelize'

class Empresa extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      codigo: Sequelize.STRING,
      ativo: Sequelize.BOOLEAN,
      cnpj: Sequelize.STRING
    },
      {
        sequelize,
        tableName: 'empresas'
      })
    return this
  }
}

export default Empresa