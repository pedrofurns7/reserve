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
Object.defineProperty(exports, "__esModule", { value: true });
class AtualizarMesaController {
    constructor(servidor, casoDeUso, ...middlewares) {
        servidor.patch("/api/mesa/:id", ...middlewares, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { nome, capacidade, status } = req.body;
                yield casoDeUso.executar(id, { nome, capacidade, status });
                res.status(200).json({ message: 'Mesa atualizada com sucesso!' });
            }
            catch (error) {
                res.status(400).json({ erro: error.message || 'Erro ao atualizar mesa.' });
            }
        }));
    }
}
exports.default = AtualizarMesaController;
