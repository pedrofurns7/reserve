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
class ListarMesaController {
    constructor(servidor, casoDeUso, ...middlewares) {
        servidor.get("/api/mesa/listar", ...middlewares, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const mesa = yield casoDeUso.executar();
                res.status(200).json(mesa);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ mensagem: 'Erro ao listar mesas', erro: error });
            }
        }));
    }
}
exports.default = ListarMesaController;
