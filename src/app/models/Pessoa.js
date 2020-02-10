import Sequelize, { Model } from 'sequelize'

class Pessoa extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      cpf: Sequelize.INTEGER,
      email: Sequelize.STRING,
      data_nascimento: Sequelize.DATEONLY
    },
      {
        sequelize,
        tableName: 'pessoas'
      })
    return this
  }
}

export default Pessoa