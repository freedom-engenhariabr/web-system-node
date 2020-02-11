import { Router } from 'express'

import PessoaController from './app/controllers/PessoaController'
import EmpresaController from './app/controllers/EmpresaController'
import FilialController from './app/controllers/FilialController'
import FuncaoController from './app/controllers/FuncaoController'
import UsuarioController from './app/controllers/UsuarioController'
import SessaoController from './app/controllers/SessaoController'
import AuthMiddlewares from './app/middlewares/auth'
import DispositivoController from './app/controllers/DispositivoController'

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

//FILIAL
routes.post('/filiais', FilialController.store)
routes.get('/filiais', FilialController.index)
routes.put('/filiais/:id', FilialController.update)

//DISPOSITIVO
routes.post('/dispositivos', DispositivoController.store)
routes.get('/dispositivos', DispositivoController.index)

//FUNCAO
routes.post('/funcoes', FuncaoController.store)
routes.get('/funcoes', FuncaoController.index)

//USUARIO
routes.get('/usuarios', UsuarioController.index)
routes.post('/usuarios', UsuarioController.store)
routes.put('/usuarios/:id', AuthMiddlewares, UsuarioController.update)

export default routes