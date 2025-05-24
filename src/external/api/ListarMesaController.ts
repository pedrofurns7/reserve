import { ListarMesa } from '../../core/mesa/service/ListarMesa'
import { Express } from "express"

export default class ListarMesaController {
    constructor(servidor: Express, casoDeUso: ListarMesa){
        servidor.get("/api/mesa/listar", async(req, res) => {
            try{
                const mesa = await casoDeUso.executar();
                res.status(200).json(mesa);
            } catch(error){
                console.error(error)
                res.status(500).json({mensagem: 'Erro ao listar mesas', erro: error});
            }
        })
    }
}
