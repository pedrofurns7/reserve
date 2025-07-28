import {Express} from 'express';
import AtualizarMesa  from '@/core/mesa/service/AtualizarMesa';


export default class AtualizarMesaController {
  constructor(servidor: Express, casoDeUso: AtualizarMesa, ...middlewares: any[]) {

    servidor.put("/api/mesa/:id", ...middlewares, async (req, res) => {
      try {
        const id = req.params.id
        const { nome, capacidade, status } = req.body;

            await casoDeUso.executar(id, { nome, capacidade, status })

            res.status(200).json({message: 'Mesa atualizada com sucesso!'});
        } catch (error: any){
            res.status(400).json({ erro: error.message || 'Erro ao atualizar mesa.' });
        }
    })
  }
}