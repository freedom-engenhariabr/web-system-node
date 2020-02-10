import { Router } from 'express'

import PessoaController from './app/controllers/PessoaController'
import EmpresaController from './app/controllers/EmpresaController'
import FuncaoController from './app/controllers/FuncaoController'
import UsuarioController from './app/controllers/UsuarioController'
import SessaoController from './app/controllers/SessaoController'
import AuthMiddlewares from './app/middlewares/auth'

const routes = new Router();



routes.post('/sessao', SessaoController.store)

routes.post('/pessoas', PessoaController.store)
routes.get('/pessoas', PessoaController.index)
routes.put('/pessoas/', AuthMiddlewares, PessoaController.update)
routes.delete('/pessoas/:id', AuthMiddlewares, PessoaController.delete)

//EMPRESA
routes.get('/empresas', EmpresaController.index)
routes.post('/empresas', EmpresaController.store)
routes.put('/empresas/:id', EmpresaController.update)

//FUNCAO
routes.post('/funcoes', FuncaoController.store)

//USUARIO
routes.get('/usuarios', UsuarioController.index)
routes.post('/usuarios', UsuarioController.store)
routes.put('/usuarios', AuthMiddlewares, UsuarioController.update)

export default routes