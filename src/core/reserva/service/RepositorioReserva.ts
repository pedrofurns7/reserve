import Reserva from '../model/Reserva'

export default interface RepositorioMesa{
    inserir(reserva: Reserva): Promise<void>;
}