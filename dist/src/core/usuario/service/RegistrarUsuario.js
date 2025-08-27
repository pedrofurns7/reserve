"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Erros_1 = __importDefault(require("@/core/shared/Erros"));
const Id_1 = __importDefault(require("@/core/shared/Id"));
class RegistrarUsuario {
    constructor(repositorio, provedorCripto) {
        this.repositorio = repositorio;
        this.provedorCripto = provedorCripto;
    }
    executar(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const senhaCripto = this.provedorCripto.criptografar(usuario.senha);
            const usuarioExistente = yield this.repositorio.buscarPorEmail(usuario.email);
            if (usuarioExistente)
                throw new Error(Erros_1.default.USUARIO_JA_EXISTE);
            const novoUsuario = {
                id: Id_1.default.gerarHash(),
                nome: usuario.nome,
                email: usuario.email,
                senha: senhaCripto,
                role: usuario.role
            };
            this.repositorio.inserir(novoUsuario);
        });
    }
}
exports.default = RegistrarUsuario;
