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
class RepositorioMesa {
    inserir(mesa) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`
            insert into mesas
            (id, nome, capacidade, status)
            values ($1, $2, $3, $4)`, [mesa.id, mesa.nome, mesa.capacidade, mesa.status]);
        });
    }
    listarTodas() {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield db_1.default.any("SELECT * FROM mesas");
            return rows.map((row) => ({
                id: row.id,
                nome: row.nome,
                capacidade: row.capacidade,
                status: row.status,
            }));
        });
    }
    atualizar(id, dados) {
        return __awaiter(this, void 0, void 0, function* () {
            const campos = [];
            const valores = [];
            let index = 1;
            if (dados.nome !== undefined) {
                campos.push(`nome = $${index++}`);
                valores.push(dados.nome);
            }
            if (dados.capacidade !== undefined) {
                campos.push(`capacidade = $${index++}`);
                valores.push(dados.capacidade);
            }
            if (dados.status !== undefined) {
                campos.push(`status = $${index++}`);
                valores.push(dados.status);
            }
            if (campos.length === 0) {
                throw new Error("Nenhum dado informado para atualização.");
            }
            valores.push(id);
            const query = `UPDATE mesas SET ${campos.join(", ")} WHERE id = $${index}`;
            yield db_1.default.none(query, valores);
        });
    }
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield db_1.default.oneOrNone("SELECT * FROM mesas WHERE id = $1", [id]);
            if (!row) {
                return null;
            }
            return {
                id: row.id,
                nome: row.nome,
                capacidade: row.capacidade,
                status: row.status,
            };
        });
    }
}
RepositorioMesa.items = [];
exports.default = RepositorioMesa;
