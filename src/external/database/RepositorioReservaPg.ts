import Reserva from "@/core/reserva/model/Reserva"
import db from "./db"

export default class RepositorioReserva {
  private static readonly items: Reserva[] = []

  async inserir(reserva: Reserva) {
    await db.query(
      `
            insert into reservas
            (id, usuario_id, mesa_id, data_reserva, status)
            values ($1, $2, $3, $4, $5)`,
      [reserva.id, reserva.usuarioId, reserva.mesaId, reserva.dataReserva, reserva.status]
    )
  }
}