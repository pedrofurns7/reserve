import { Express } from "express"
import RegistrarReserva from "@/core/reserva/service/RegistrarReserva"

export default class RegistrarReservaController {
  constructor(
    servidor: Express,
    casoDeUso: RegistrarReserva,
    ...middlewares: any[]
  ) {
    servidor.post(
      "/api/reserva/registrar",
      ...middlewares,
      async (req, res) => {
        try {
          await casoDeUso.executar({
            usuarioId: req.body.usuarioId,
            mesaId: req.body.mesaId,
            dataReserva: new Date(req.body.dataReserva),
            quantidadePessoas: req.body.quantidadePessoas,
            status: "ativo", // ou 'cancelado', dependendo do caso
          })
          res.status(201).send()
        } catch (erro: any) {
          res.status(400).send(erro.message)
        }
      }
    )
  }
}
