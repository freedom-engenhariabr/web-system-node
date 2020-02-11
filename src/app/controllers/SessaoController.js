import jwt from 'jsonwebtoken'

import authConfig from '../config/auth'

import Usuario from '../models/Usuario'
import Pessoa from '../models/Pessoa'


class SessaoController {

  async store(req, res) {

    const { email, senha } = req.body

    const pessoa = await Pessoa.findOne({
      where: { email: email }
    })

    if (!pessoa) {
      return res.status(401).json({ erro: 'Pessoa não existe' })
    }

    const usuario = await Usuario.findOne({
      where: { pessoa_id: pessoa.id }
    })

    //Verifica se existe um usuário
    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não existe' })
    }

    //Verifica se o password esta batendo com o db
    if (!(await usuario.checkPassword(senha))) {
      return res.status(401).json({ erro: 'Senha errada' })
    }

    const { id, pessoa_id } = usuario

    //Retornando para o cliente
    //dois obj: User, token
    //Token: { id do user}, 'Texto secreto chave ', { tempo de expiracao do token}
    return res.json({

      usuario: {
        id,
        pessoa_id
      },
      token: jwt.sign({ id, pessoa_id }, authConfig.segredo, { expiresIn: authConfig.empiraEm })
    })
  }
}


export default new SessaoController()