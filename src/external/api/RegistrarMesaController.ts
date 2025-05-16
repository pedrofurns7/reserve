import RegistrarMesa from "@/core/mesa/service/RegistrarMesa"
import { Express } from "express"
export default class RegistrarMesaController {
  constructor(servidor: Express, casoDeUso: RegistrarMesa) {
    servidor.post("/api/mesa/registrar", async (req, res) => {
      try {
        await casoDeUso.executar({
            nome: req.body.nome,
            capacidade: req.body.capacidade,
            status: req.body.status
        })

        res.status(201).send()
      } catch (erro: any) {
        res.status(400).send(erro.message)
      }
    })
  }
}
