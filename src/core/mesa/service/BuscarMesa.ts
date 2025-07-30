import RepositorioMesa from './RepositorioMesa';
import Mesa  from '../model/Mesa';

export class BuscarMesa {
    constructor(private repositorioMesa: RepositorioMesa){}

    async executar(id: string): Promise<Mesa> {
        const mesa = await this.repositorioMesa.buscarPorId(id);
        if (!mesa) {
            throw new Error(`Mesa não encontrada.`);
        }
        return mesa;
    }
}