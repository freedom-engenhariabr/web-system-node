import Usuario from '../models/Usuario'
import Pessoa from '../models/Pessoa'
import Funcao from '../models/Funcao'

import * as Yup from 'yup'

class UsuarioController {
  async index(req, res) {
    const usuarios = await Usuario.findAll(
      {
        where: {},
        attributes: ['id', 'codigo', 'ativo',],
        include: [
          {
            model: Pessoa,
            as: 'pessoa',
            attributes: ['nome', 'cpf', 'email', 'data_nascimento']
          },
          {
            model: Funcao,
            as: 'funcao',
            attributes: ['codigo']
          }
        ]
      })

    return res.json(usuarios)
  }

  async store(req, res) {

    const existePessoa = await Pessoa.findByPk(req.body.pessoa_id)

    if (!existePessoa) {
      return res.status(401).json({ erro: 'Não existe essa pessoa' })
    }

    const { id, ativo, codigo } = await Usuario.create(req.body)
    return res.json({
      id,
      ativo,
      codigo
    })
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      ativo: Yup.boolean(),
      codigo: Yup.string(),
    })

    if (!(await schema.isValid(req.body))) {
      return req.status(400).json({ error: 'Campos inválidos' })
    }

    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não existe ' })
    }

    const { ativo, codigo } = await usuario.update(req.body)

    return res.status(200).json({
      ativo, codigo
    })

  }

  async delete(req, res) {

    const pessoa = await Pessoa.findByPk(req.pessoaId)

    await pessoa.destroy()

    return res.status(200).json({ ok: 'Delete ok' })
  }

}

export default new UsuarioController()