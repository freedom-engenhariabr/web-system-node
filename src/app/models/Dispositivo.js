import Sequelize, { Model } from 'sequelize'

class Dispositivo extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      codigo: Sequelize.STRING,
    },
      {
        sequelize
      })
    return this
  }
  static associate(models) {
    this.belongsTo(models.Filial, { foreignKey: 'filial_id', as: 'filial' })
  }
}

export default Dispositivo