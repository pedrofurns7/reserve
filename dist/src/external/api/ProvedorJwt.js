"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ProvedorJwt {
    constructor(secret) {
        this.secret = secret;
    }
    gerar(dados) {
        return jsonwebtoken_1.default.sign(dados, this.secret, {
            expiresIn: "1d",
        });
    }
    obter(token) {
        return jsonwebtoken_1.default.verify(token, this.secret);
    }
}
exports.default = ProvedorJwt;
