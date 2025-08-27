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
const Id_1 = __importDefault(require("@/core/shared/Id"));
class RegistrarReserva {
    constructor(repositorio, atualizarMesa, buscarMesa) {
        this.repositorio = repositorio;
        this.atualizarMesa = atualizarMesa;
        this.buscarMesa = buscarMesa;
    }
    executar(reserva) {
        return __awaiter(this, void 0, void 0, function* () {
            const hoje = new Date();
            const novaReserva = {
                id: Id_1.default.gerarHash(),
                usuarioId: reserva.usuarioId,
                mesaId: reserva.mesaId,
                dataReserva: reserva.dataReserva,
                quantidadePessoas: reserva.quantidadePessoas,
                status: reserva.status,
            };
            const disponivel = yield this.repositorio.estaDisponivel(reserva.mesaId, reserva.dataReserva);
            if (!disponivel) {
                throw new Error("A mesa já está reservada nesta data");
            }
            if (novaReserva.dataReserva < new Date()) {
                throw new Error("A data da reserva não pode ser no passado.");
            }
            //inserir validação para verificar se a mesa está disponível
            const mesa = yield this.buscarMesa.executar(reserva.mesaId);
            if (!mesa) {
                throw new Error("Mesa não encontrada.");
            }
            if (mesa.capacidade < reserva.quantidadePessoas) {
                throw new Error("Quantidade de pessoas excede a capacidade da mesa.");
            }
            yield this.repositorio.inserir(novaReserva);
            yield this.atualizarMesa.executar(reserva.mesaId, {
                status: 'reservada'
            });
        });
    }
}
exports.default = RegistrarReserva;
