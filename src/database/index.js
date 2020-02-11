import Sequelize from 'sequelize'

import databaseConfig from '../config/database'
import Funcao from '../app/models/Funcao'
import Pessoa from '../app/models/Pessoa'
import Usuario from '../app/models/Usuario'
import Empresa from '../app/models/Empresa'
import Filial from '../app/models/Filial'
import Dispositivo from '../app/models/Dispositivo'

const models = [
  Funcao,
  Pessoa,
  Usuario,
  Empresa,
  Filial,
  Dispositivo
]

class DataBase {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

}


export default new DataBase()