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

    async listarTodas(): Promise<Mesa[]>{ 
        const rows = await db.any('SELECT * FROM mesas')
        return rows.map((row) => ({
            id: row.id,
            nome: row.nome,
            capacidade: row.capacidade,
            status: row.status
        }));
    }
}