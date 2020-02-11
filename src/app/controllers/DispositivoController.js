import Dispositivo from '../models/Dispositivo'
import Filial from '../models/Filial'

import * as Yup from 'yup'

class DispositivoController {

  async index(req, res) {

    const dispositivos = await Dispositivo.findAll({
      attributes: ['id', 'nome', 'codigo'],
      include: [{
        model: Filial,
        as: 'filial',
        attributes: ['id', 'nome', 'codigo'],
      }]
    })

    return res.status(200).json(dispositivos)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      codigo: Yup.string().required(),
      filial_id: Yup.number().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ erro: 'Algum campo inválido' })
    }

    const existeFilial = await Filial.findOne({
      where: { id: req.body.filial_id }
    })

    if (!existeFilial) {
      return res.status(401).json({ erro: 'Filial não existe' })
    }

    const existeNome = await Dispositivo.findOne({
      where: {
        nome: req.body.nome,
        filial_id: req.body.filial_id
      }
    })

    if (existeNome) {
      return res.status(401).json({ erro: 'Já existe um dispostivo com esse nome' })
    }

    const existeCodigo = await Dispositivo.findOne({
      where: {
        codigo: req.body.codigo,
        filial_id: req.body.filial_id
      }
    })

    if (existeCodigo) {
      return res.status(401).json({ erro: 'Já existe um dispostivo com esse codigo' })
    }

    const { id, nome, codigo, filial_id } = await Dispositivo.create(req.body)

    return res.status(200).json({
      id,
      nome,
      codigo,
      filial_id
    })
  }
}

export default new DispositivoController()