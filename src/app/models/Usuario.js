import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs';

class Usuario extends Model {
  static init(sequelize) {
    super.init({
      ativo: Sequelize.BOOLEAN,
      codigo: Sequelize.STRING,
      senha: Sequelize.VIRTUAL,
      senha_hash: Sequelize.STRING
    },
      {
        sequelize,
        tableName: 'usuarios'
      });
    // Código que será executado antes de qualquer save no db beforeSave'
    this.addHook('beforeSave', async usuario => {
      if (usuario.senha) {
        // passa o password criptografado para password_hash, 8 a forca da cript
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
      }
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Pessoa, { foreignKey: 'pessoa_id', as: 'pessoa' })
    this.belongsTo(models.Funcao, { foreignKey: 'funcao_id', as: 'funcao' })
  }

  checkPassword(senha) {
    return bcrypt.compare(senha, this.senha_hash)

  }

}

export default Usuario