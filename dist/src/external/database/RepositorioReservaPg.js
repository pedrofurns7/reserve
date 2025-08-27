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
class RepositorioReservaPg {
    inserir(reserva) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`
            insert into reservas
            (id, usuario_id, mesa_id, data_reserva, status)
            values ($1, $2, $3, $4, $5)`, [
                reserva.id,
                reserva.usuarioId,
                reserva.mesaId,
                reserva.dataReserva,
                reserva.status,
            ]);
        });
    }
    buscarPorId(reservaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.oneOrNone(`SELECT * FROM reservas WHERE id = $1`, [reservaId]);
            return result ? result : null;
        });
    }
    atualizarStatus(reservaId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`UPDATE reservas SET status = $1 WHERE id = $2`, [status, reservaId]);
        });
    }
    estaDisponivel(mesaId, dataReserva) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.oneOrNone(`SELECT COUNT(*) AS count FROM reservas WHERE mesa_id = $1 AND data_reserva = $2`, [mesaId, dataReserva]);
            const count = result === null || result === void 0 ? void 0 : result.count;
            console.log(result);
            if (count === undefined) {
                throw new Error("Erro ao verificar disponibilidade da mesa.");
            }
            return parseInt(count) === 0;
        });
    }
}
RepositorioReservaPg.items = [];
exports.default = RepositorioReservaPg;
