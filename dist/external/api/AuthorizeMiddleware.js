"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const usuario = req.usuario;
        const acessoNegado = () => res.status(403).send("Acesso negado");
        if (!usuario || !allowedRoles.includes(usuario.role)) {
            acessoNegado();
            return;
        }
        next();
    };
};
exports.authorize = authorize;
