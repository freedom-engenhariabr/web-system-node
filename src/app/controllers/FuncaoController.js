import Funcao from '../models/Funcao'
import Empresa from '../models/Empresa'
import * as Yup from 'yup'

class FuncaoController {

  async index(req, res) {

    const funcoes = await Funcao.findAll({
      attributes: ['id', 'nome', 'codigo', 'empresa_id']
    })

    return res.status(200).json(funcoes)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      codigo: Yup.string().required(),
      nome: Yup.string().required(),
      empresa_id: Yup.number().required(),

    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ erro: 'Algum campo inválido' })
    }

    const existeEmpresa = await Empresa.findByPk(req.body.empresa_id)

    if (!existeEmpresa) {
      return res.status(401).json({ erro: 'Empresa não existe' })
    }

    const existeCodigo = await Funcao.findAll({
      where: {
        empresa_id: req.body.empresa_id,
        codigo: req.body.codigo
      }
    })

    if (existeCodigo.length > 0) {
      return res.status(401).json({ erro: 'Já existe uma função com esse código' })
    }

    const existeNome = await Funcao.findAll({
      where: {
        empresa_id: req.body.empresa_id,
        nome: req.body.nome
      }
    })

    if (existeNome.length > 0) {
      return res.status(401).json({ erro: 'Já existe uma função com esse noe' })
    }

    const funcao = await Funcao.create(req.body)

    return res.status(200).json(funcao)
  }
}

export default new FuncaoController()