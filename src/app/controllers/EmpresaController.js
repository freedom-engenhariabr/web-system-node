import * as Yup from 'yup'

import Empresa from '../models/Empresa'
import Funcao from '../models/Funcao'

class EmpresaController {

  async index(req, res) {
    const empresas = await Empresa.findAll({
      attributes: ['id', 'nome', 'codigo', 'ativo', 'cnpj'],
      include: [
        {model: Funcao,
          as: 'funcoes',
          attributes: ['id', 'nome', 'codigo']
        }
      ]
    })

    return res.status(200).json(empresas)
  }

  async store(req, res) {

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cnpj: Yup.string().required(),
      codigo: Yup.string().required(),
      ativo: Yup.boolean().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ erro: 'Algum campo inválido' })
    }

    const existeEmpresaCnpj = await Empresa.findOne({
      where: { cnpj: req.body.cnpj }
    })

    if (existeEmpresaCnpj) {
      return res.status(401).json({ erro: 'Já existe uma empresa com o CNPJ informado' })
    }

    const existeEmpresaCodigo = await Empresa.findOne({
      where: { codigo: req.body.codigo }
    })

    if (existeEmpresaCodigo) {
      return res.status(401).json({ erro: 'Já existe uma empresa com o Código informado' })
    }

    const { id, nome, codigo, ativo } = await Empresa.create(req.body)
    return res.status(200).json({
      id,
      nome,
      codigo,
      ativo
    })
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      codigo: Yup.string(),
      ativo: Yup.boolean()
    })

    if (!(schema.isValid(req.body))) {
      return res.status(401).json({ erro: 'Campo inválido' })
    }

    const existeCodigo = await Empresa.findOne({
      where: { codigo: req.body.codigo }
    })

    if (existeCodigo) {
      return res.status(401).json({ erro: 'Código já utilizado' })
    }

    const empresa = await Empresa.findByPk(req.params.id)

    const { codigo, ativo } = await empresa.update(req.body)

    return res.status(200).json({
      codigo,
      ativo
    })

  }
}

export default new EmpresaController()