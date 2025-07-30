import Mesa from "@/core/mesa/model/Mesa"
import db from "./db"

export default class RepositorioMesa {
  private static readonly items: Mesa[] = []

  async inserir(mesa: Mesa) {
    await db.query(
      `
            insert into mesas
            (id, nome, capacidade, status)
            values ($1, $2, $3, $4)`,
      [mesa.id, mesa.nome, mesa.capacidade, mesa.status]
    )
  }

  async listarTodas(): Promise<Mesa[]> {
    const rows = await db.any("SELECT * FROM mesas")
    return rows.map((row) => ({
      id: row.id,
      nome: row.nome,
      capacidade: row.capacidade,
      status: row.status,
    }))
  }

 
  async atualizar(id: string, dados: Partial<Mesa>): Promise<void> {
    const campos = []
    const valores = []
    let index = 1

    if (dados.nome !== undefined) {
      campos.push(`nome = $${index++}`)
      valores.push(dados.nome)
    }

    if (dados.capacidade !== undefined) {
      campos.push(`capacidade = $${index++}`)
      valores.push(dados.capacidade)
    }

    if (dados.status !== undefined) {
      campos.push(`status = $${index++}`)
      valores.push(dados.status)
    }

    if (campos.length === 0) {
      throw new Error("Nenhum dado informado para atualização.")
    }

    valores.push(id) 
    const query = `UPDATE mesas SET ${campos.join(", ")} WHERE id = $${index}`

    await db.none(query, valores)
  }

  async buscarPorId(id: string): Promise<Mesa | null>{
    const row = await db.oneOrNone("SELECT * FROM mesas WHERE id = $1", [id])
    if(!row) {
      return null
    } 

    return {
      id: row.id,
      nome: row.nome,
      capacidade: row.capacidade,
      status: row.status,
    }
  }
}
