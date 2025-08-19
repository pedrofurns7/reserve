import { Express } from "express";

import CancelarReserva from "@/core/reserva/service/CancelarReserva";

export default class CancelarReservaController {
    constructor(servidor: Express, casoDeUso: CancelarReserva, ...middlewares: any[]) {
        servidor.patch("/api/reserva/:id/cancelar", ...middlewares, async (req, res) => {
            try {
                const reservaId = req.params.id;

                await casoDeUso.executar(reservaId);

                res.status(200).json({ mensagem: "Reserva cancelada com sucesso." });
            } catch (error: any) {
                res.status(400).json({ erro: error.message || "Erro ao cancelar reserva." });
            }
        });
    }   
}