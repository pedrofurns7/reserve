"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const UsuarioMiddleware_1 = __importDefault(require("./external/api/UsuarioMiddleware"));
const SenhaCripto_1 = __importDefault(require("./external/auth/SenhaCripto"));
const RepositorioUsuarioPg_1 = __importDefault(require("./external/database/RepositorioUsuarioPg"));
const RegistrarUsuarioController_1 = __importDefault(require("./external/api/RegistrarUsuarioController"));
const RegistrarUsuario_1 = __importDefault(require("./core/usuario/service/RegistrarUsuario"));
const LoginUsuarioController_1 = __importDefault(require("./external/api/LoginUsuarioController"));
const LoginUsuario_1 = __importDefault(require("./core/usuario/service/LoginUsuario"));
const RepositorioMesaPg_1 = __importDefault(require("./external/database/RepositorioMesaPg"));
const RegistrarMesaController_1 = __importDefault(require("./external/api/RegistrarMesaController"));
const AuthorizeMiddleware_1 = require("./external/api/AuthorizeMiddleware");
const RegistrarMesa_1 = __importDefault(require("./core/mesa/service/RegistrarMesa"));
const ListarMesa_1 = require("./core/mesa/service/ListarMesa");
const ListarMesaController_1 = __importDefault(require("./external/api/ListarMesaController"));
const AtualizarMesaController_1 = __importDefault(require("./external/api/AtualizarMesaController"));
const AtualizarMesa_1 = __importDefault(require("./core/mesa/service/AtualizarMesa"));
const RepositorioReservaPg_1 = __importDefault(require("./external/database/RepositorioReservaPg"));
const RegistrarReservaController_1 = __importDefault(require("./external/api/RegistrarReservaController"));
const RegistrarReserva_1 = __importDefault(require("./core/reserva/service/RegistrarReserva"));
const BuscarMesa_1 = require("./core/mesa/service/BuscarMesa");
const CancelarReserva_1 = __importDefault(require("./core/reserva/service/CancelarReserva"));
const CancelarReservaController_1 = __importDefault(require("./external/api/CancelarReservaController"));
const app = (0, express_1.default)();
const porta = (_a = process.env.API_PORT) !== null && _a !== void 0 ? _a : 4001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(porta, () => {
    console.log(`🔥 servidor executando na porta ${porta}`);
});
//rotas abertas
const repositorioUsuario = new RepositorioUsuarioPg_1.default();
const provedorCripto = new SenhaCripto_1.default();
const registrarUsuario = new RegistrarUsuario_1.default(repositorioUsuario, provedorCripto);
const loginUsuario = new LoginUsuario_1.default(repositorioUsuario, provedorCripto);
new RegistrarUsuarioController_1.default(app, registrarUsuario);
new LoginUsuarioController_1.default(app, loginUsuario);
const usuarioMid = (0, UsuarioMiddleware_1.default)(repositorioUsuario);
const authorizeMid = (0, AuthorizeMiddleware_1.authorize)(["admin"]);
const repositorioMesa = new RepositorioMesaPg_1.default();
const registrarMesa = new RegistrarMesa_1.default(repositorioMesa);
new RegistrarMesaController_1.default(app, registrarMesa, usuarioMid, authorizeMid);
const listarMesas = new ListarMesa_1.ListarMesa(repositorioMesa);
new ListarMesaController_1.default(app, listarMesas, usuarioMid);
const atualizarMesa = new AtualizarMesa_1.default(repositorioMesa);
new AtualizarMesaController_1.default(app, atualizarMesa);
const buscarMesa = new BuscarMesa_1.BuscarMesa(repositorioMesa);
//-rotas reservas
const repositorioReserva = new RepositorioReservaPg_1.default();
//registrar
const registrarReserva = new RegistrarReserva_1.default(repositorioReserva, atualizarMesa, buscarMesa);
new RegistrarReservaController_1.default(app, registrarReserva);
//cancelar
const cancelarReserva = new CancelarReserva_1.default(repositorioReserva);
new CancelarReservaController_1.default(app, cancelarReserva);
