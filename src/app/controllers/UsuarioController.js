import Usuario from '../models/Usuario'
import Pessoa from '../models/Pessoa'
import Funcao from '../models/Funcao'
import Mail from '../../lib/Mail'

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
            attributes: ['nome']
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

    if (req.body.funcao_id) {
      const existeFuncao = await Funcao.findByPk(req.body.funcao_id)

      if (!existeFuncao) {
        return res.status(401).json({ erro: 'Essa funcao não existe' })
      }
    }

    const existeCodigo = await Usuario.findOne({
      where: { codigo: req.body.codigo }
    })

    if (existeCodigo) {
      return res.status(401).json({ erro: 'Já existe um usuário com esse código' })
    }

    const existeUsuarioComIdPessoa = await Usuario.findOne({
      where: { pessoa_id: req.body.pessoa_id }
    })

    if (existeUsuarioComIdPessoa) {
      return res.status(401).json({ erro: 'Já existe um usuário com o id dessa pessoa' })
    }

    const { id, ativo, codigo } = await Usuario.create(req.body)

    await Mail.sendMail({
      to: `${existePessoa.nome} <${existePessoa.email}>`,
      subject: 'Usuário criado',
      template: 'creacaoUsuario',
      context: {
        usuario: existePessoa.nome,
        user: existePessoa.nome
        //date: format(appointment.date, "'dia' dd 'de' MMMM', às' H:mm'h'",
        //{ locale: pt }
        //)
      }
    })

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
      funcao_id: Yup.number()
    })

    if (!(await schema.isValid(req.body))) {
      return req.status(400).json({ error: 'Campos inválidos' })
    }

    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não existe ' })
    }

    const existeFuncao = await Funcao.findByPk(req.body.funcao_id)

    if (!existeFuncao) {
      return res.status(401).json({ erro: 'Essa funcao não existe' })
    }


    const { ativo, codigo, funcao_id } = await usuario.update(req.body)

    return res.status(200).json({
      ativo, codigo, funcao_id
    })

  }

  async delete(req, res) {

    const pessoa = await Pessoa.findByPk(req.pessoaId)

    await pessoa.destroy()

    return res.status(200).json({ ok: 'Delete ok' })
  }

}

export default new UsuarioController()