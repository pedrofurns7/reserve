import Mesa from "@/core/mesa/model/Mesa"
import db from "./db"

export default class RepositorioMesa{
    
    private static readonly items: Mesa[] = []
    
    async inserir(mesa: Mesa){
       await db.query(`
        insert into mesas
        (id, nome, capacidade, status)
        values ($1, $2, $3, $4)`,
        [
            mesa.id,
            mesa.nome,
            mesa.capacidade,
            mesa.status
        ]
    )
    }

}