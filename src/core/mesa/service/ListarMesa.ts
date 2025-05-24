import RepositorioMesa from './RepositorioMesa';
import Mesa  from '../model/Mesa';

export class ListarMesa {
    constructor(private repositorioMesa: RepositorioMesa){}

    async executar(): Promise<Mesa[]>{
        return this.repositorioMesa.listarTodas();
    }
}