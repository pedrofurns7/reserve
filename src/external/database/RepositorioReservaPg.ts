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
      [
        reserva.id,
        reserva.usuarioId,
        reserva.mesaId,
        reserva.dataReserva,
        reserva.status,
      ]
    )
  }

  async estaDisponivel(mesaId: string, dataReserva: Date): Promise<boolean> {
    const result = await db.oneOrNone(
      `SELECT COUNT(*) AS count FROM reservas WHERE mesa_id = $1 AND data_reserva = $2`,
      [mesaId, dataReserva]
    );
    const count = result?.count;

    console.log(result); 

    if (count === undefined) {
      throw new Error("Erro ao verificar disponibilidade da mesa.");
    }

    return parseInt(count) === 0;
  }
}
