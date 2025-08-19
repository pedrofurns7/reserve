import Reserva from '../model/Reserva'

export default interface RepositorioReserva{
    inserir(reserva: Reserva): Promise<void>;
    estaDisponivel(mesaId: string, dataReserva: Date): Promise<boolean>;
    atualizarStatus(reservaId: string, status: string): Promise<void>;
    buscarPorId(reservaId: string): Promise<Reserva | null>;
}