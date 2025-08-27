"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Na arquitetura hexagonal esta classe é um Adaptador
//O adaptador NÃO FAZ parte do core bussiness da aplicação
class InverterSenhaCripto {
    criptografar(senha) {
        return senha.split('').reverse().join('');
    }
}
exports.default = InverterSenhaCripto;
