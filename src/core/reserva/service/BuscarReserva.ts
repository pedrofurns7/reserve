import RepositorioReserva from './RepositorioReserva';
import Reserva  from '../model/Reserva';

export default class BuscarReserva {
    constructor(private repositorioReserva: RepositorioReserva){}

    async executar(id: string): Promise<Reserva> {
        const mesa = await this.repositorioReserva.buscarPorId(id);
        if (!mesa) {
            throw new Error(`Reserva não encontrada.`);
        }
        return mesa;
    }
}