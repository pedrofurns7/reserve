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
const db_1 = __importDefault(require("./db"));
class RepositorioUsuarioPg {
    inserir(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`
        insert into usuarios
        (id, nome, email, senha, role)
        values ($1, $2, $3, $4, $5)`, [
                usuario.id,
                usuario.nome,
                usuario.email,
                usuario.senha,
                usuario.role
            ]);
        });
    }
    buscarPorEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield db_1.default.oneOrNone('select * from usuarios where email = $1', [email]);
            if (!usuario)
                return null;
            return usuario;
        });
    }
}
RepositorioUsuarioPg.items = [];
exports.default = RepositorioUsuarioPg;
