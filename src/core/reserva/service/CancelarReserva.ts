import RepositorioReserva from "../service/RepositorioReserva"

export default class CancelarReserva {
  constructor(private repositorioReserva: RepositorioReserva) {}

  async executar(reservaId: string): Promise<void> {
    const reserva = await this.repositorioReserva.buscarPorId(reservaId)

    if(!reserva) throw new Error("Reserva não encontrada.")
   
    await this.repositorioReserva.atualizarStatus(reservaId, 'cancelada')

  }
}
