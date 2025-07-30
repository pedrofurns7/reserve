import {Express} from 'express';
import AtualizarMesa  from '@/core/mesa/service/AtualizarMesa';
import { BuscarMesa } from '@/core/mesa/service/BuscarMesa';


export default class AtualizarMesaController {
  constructor(servidor: Express, casoDeUso: BuscarMesa, ...middlewares: any[]) {

    servidor.get("/api/mesa/:id", ...middlewares, async (req, res) => {
      try {
        const id = req.params.id
       

        const mesa = casoDeUso.executar(id)

            res.status(200).json(mesa);
        } catch (error: any){
            res.status(400).json({ erro: error.message || 'Erro ao encontrar mesa.' });
        }
    })
  }
}