import Funcao from '../models/Funcao'
import Empresa from '../models/Empresa'
import * as Yup from 'yup'

class FuncaoController {
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

    const funcoes = await Funcao.findAll({
      where: { empresa_id: req.body.empresa_id }
    })

    funcoes.map(funcao => {
      if (funcao.codigo == req.body.codigo)
        return res.status(401).json({ erro: 'Já existe uma função com esse código' })
      
        if (funcao.nome == req.body.nome)
        return res.status(401).json({ erro: 'Já existe uma função com esse nome' })

    })

    console.log(funcoes)

    const funcao = await Funcao.create(req.body)

    return res.status(200).json(funcao)
  }
}

export default new FuncaoController()