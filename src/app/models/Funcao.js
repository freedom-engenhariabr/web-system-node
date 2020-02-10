import Sequelize, { Model } from 'sequelize'

class Funcao extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      codigo: Sequelize.STRING,
      empresa_id: Sequelize.INTEGER
    },
    {
      sequelize,
      tableName: 'funcoes'
    })
    return this
  }

  static associate(models) {
    this.belongsTo(models.Empresa, { foreignKey: 'empresa_id', as: 'empresa' })

  }
}

export default Funcao