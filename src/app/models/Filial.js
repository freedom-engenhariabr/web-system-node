import Sequelize, { Model } from 'sequelize'

class Filial extends Model {
  static init(sequelize) {
    super.init({
      codigo: Sequelize.INTEGER,
      nome: Sequelize.STRING,
    },
      {
        sequelize,
        tableName: 'filiais'
      })
    return this
  }
  static associate(models) {
    this.belongsTo(models.Empresa, { foreignKey: 'empresa_id', as: 'empresa' })
  }
}

export default Filial