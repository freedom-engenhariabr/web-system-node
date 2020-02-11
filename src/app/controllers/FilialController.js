import * as Yup from 'yup'
import Filial from '../models/Filial'
import Empresa from '../models/Empresa'

class FilialController {

  async index(req, res) {

    const filiais = await Filial.findAll({
      attributes: ['id', 'codigo', 'nome', 'empresa_id'],
      include: [
        {
          model: Empresa,
          as: 'empresa',
          attributes: ['id', 'nome', 'codigo', 'cnpj']
        }
      ]
    })

    return res.status(200).json(filiais)
  }

  async store(req, res) {

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      codigo: Yup.string().required(),
      ativo: Yup.boolean().required(),
      empresa_id: Yup.number().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ erro: 'Algum campo inválido' })
    }

    const existeEmpresa = await Empresa.findByPk(req.body.empresa_id)

    if (!existeEmpresa) {
      return res.status(401).json({ erro: 'Empresa não existe' })
    }

    const existeCodigo = await Filial.findAll({
      where: {
        codigo: req.body.codigo,
        empresa_id: req.body.empresa_id
      }
    })

    if (existeCodigo.length > 0) {
      return res.status(401).json({ erro: 'Já existe uma filial com esse código' })
    }

    const { id, nome, codigo, ativo, } = await Filial.create(req.body)

    return res.json({
      id,
      nome,
      codigo,
      ativo
    })
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      nome: Yup.string(),
      codigo: Yup.string(),
      ativo: Yup.boolean(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ erro: 'Algum campo inválido' })
    }

    const existeCodigo = await Filial.findAll({
      where: {
        codigo: req.body.codigo,
        empresa_id: req.body.empresa_id
      }
    })

    if (existeCodigo.length > 0) {
      return res.status(401).json({ erro: 'Já existe uma filial com esse código' })
    }

    const filial = await Filial.findByPk(req.params.id)

    const { id, nome, codigo, ativo, } = await filial.update(req.body)

    return res.json({
      id,
      nome,
      codigo,
      ativo
    })

  }
}

export default new FilialController()