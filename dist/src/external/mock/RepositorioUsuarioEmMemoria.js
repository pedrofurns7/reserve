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
class RepositorioUsuarioEmMemoria {
    inserir(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = RepositorioUsuarioEmMemoria.items;
            const usuarioExistente = yield this.buscarPorEmail(usuario.email);
            if (usuarioExistente)
                return;
            items.push(usuario);
        });
    }
    buscarPorEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const items = RepositorioUsuarioEmMemoria.items;
            return (_a = items.find(u => u.email === email)) !== null && _a !== void 0 ? _a : null;
        });
    }
}
RepositorioUsuarioEmMemoria.items = [];
exports.default = RepositorioUsuarioEmMemoria;
