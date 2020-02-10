import *  as Yup from 'yup'
import Pessoa from '../models/Pessoa'

class PessoaController {
  async index(req, res) {
    const pessoas = await Pessoa.findAll({
      attributes: ['id', 'nome', 'cpf', 'email', 'data_nascimento']
    })
    return res.json(pessoas)
  }

  async store(req, res) {

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf: Yup.string().required(),
      email: Yup.string().email().required(),
    })

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ erro: 'Algum Campo inválido' })
    }

    const existeEmailOuCpf = await Pessoa.findOne({
      where: { cpf: req.body.cpf },
      where: { email: req.body.email }
    })

    if (existeEmailOuCpf) {
      return res.status(400).json({ erro: 'Email e/ou CPF já utilizado' })
    }

    const { id, nome, email, cpf, data_nascimento } = await Pessoa.create(req.body)
    return res.status(200).json({
      id,
      nome,
      email,
      cpf,
      data_nascimento
    })
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      cpf: Yup.string(),
    })

    if (!(await schema.isValid(req.body))) {
      return req.status(400).json({ error: 'Campos inválidos' })
    }

    const pessoa = await Pessoa.findByPk(req.pessoaId)
    if (!pessoa) {
      return res.status(401).json({ erro: 'Essa pessoa não existe ' })
    }

    const existeEmail = await Pessoa.findOne({
      where: { email: ((req.body.email ? req.body.email : null)) }
    })

    if (existeEmail) {
      return res.status(401).json({ erro: 'Já existe esse email cadastrado' })
    }

    const existeCpf = await Pessoa.findOne({
      where: { cpf: (req.body.cpf ? req.body.cpf : null) }
    })

    if (existeCpf) {
      return res.status(401).json({ erro: 'Já existe esse CPF cadastrado' })
    }

    const { nome, email, cpf, data_nascimento } = await pessoa.update(req.body)

    return res.status(200).json({
      nome, email, cpf, data_nascimento
    })

  }

  async delete(req, res) {

    const pessoa = await Pessoa.findByPk(req.pessoaId)

    await pessoa.destroy()

    return res.status(200).json({ ok: 'Delete ok' })
  }
}

export default new PessoaController()