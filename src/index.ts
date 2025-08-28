import dotenv from 'dotenv'
dotenv.config()

import 'module-alias/register';
import express from 'express'


import UsuarioMiddleware from './external/api/UsuarioMiddleware'
import SenhaCripto from './external/auth/SenhaCripto'
import RepositorioUsuarioPg from './external/database/RepositorioUsuarioPg'
import RegistrarUsuarioController from './external/api/RegistrarUsuarioController'
import RegistrarUsuario from './core/usuario/service/RegistrarUsuario'
import LoginUsuarioController from './external/api/LoginUsuarioController'
import LoginUsuario from './core/usuario/service/LoginUsuario'
import RepositorioMesaPg from './external/database/RepositorioMesaPg'
import RegistrarMesaController from './external/api/RegistrarMesaController'
import { authorize } from './external/api/AuthorizeMiddleware'
import RegistrarMesa from './core/mesa/service/RegistrarMesa'
import { ListarMesa } from './core/mesa/service/ListarMesa'
import  ListarMesaController from './external/api/ListarMesaController'
import AtualizarMesaController from './external/api/AtualizarMesaController'
import  AtualizarMesa from './core/mesa/service/AtualizarMesa'
import RepositorioReservaPg from './external/database/RepositorioReservaPg'
import RegistrarReservaController from './external/api/RegistrarReservaController'
import RegistrarReserva from './core/reserva/service/RegistrarReserva'
import { BuscarMesa } from './core/mesa/service/BuscarMesa'
import CancelarReserva from './core/reserva/service/CancelarReserva'
import CancelarReservaController from './external/api/CancelarReservaController'



const app = express()
const porta = process.env.API_PORT ?? 4001  

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.listen(porta, () =>{
    console.log(`🔥 servidor executando na porta ${porta}`)
})

//rotas abertas

const repositorioUsuario = new RepositorioUsuarioPg()
const provedorCripto = new SenhaCripto()

const registrarUsuario = new RegistrarUsuario(
    repositorioUsuario,
    provedorCripto
)


const loginUsuario = new LoginUsuario(
    repositorioUsuario,
    provedorCripto
)

new RegistrarUsuarioController(app, registrarUsuario)
new LoginUsuarioController(app, loginUsuario)

const usuarioMid = UsuarioMiddleware(repositorioUsuario)

const authorizeMid = authorize(["admin"])




const repositorioMesa = new RepositorioMesaPg()

const registrarMesa = new RegistrarMesa(
    repositorioMesa
)

new RegistrarMesaController(app, registrarMesa, usuarioMid, authorizeMid)

const listarMesas = new ListarMesa(repositorioMesa)

new ListarMesaController(app, listarMesas, usuarioMid)


const atualizarMesa = new AtualizarMesa(repositorioMesa)

new AtualizarMesaController(app, atualizarMesa)

const buscarMesa = new BuscarMesa(repositorioMesa)


//-rotas reservas

const repositorioReserva = new RepositorioReservaPg()

//registrar

const registrarReserva = new RegistrarReserva(repositorioReserva, atualizarMesa, buscarMesa)

new RegistrarReservaController(app, registrarReserva)   

//cancelar

const cancelarReserva = new CancelarReserva(repositorioReserva)

new CancelarReservaController(app, cancelarReserva)