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
class RegistrarUsuarioController {
    constructor(servidor, casoDeUso) {
        servidor.post("/api/usuarios/registrar", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield casoDeUso.executar({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                    role: req.body.role
                });
                res.status(201).send();
            }
            catch (erro) {
                res.status(400).send(erro.message);
            }
        }));
    }
}
exports.default = RegistrarUsuarioController;
