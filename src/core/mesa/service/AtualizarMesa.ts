import RepositorioMesa from './RepositorioMesa';
import Mesa from '../model/Mesa';


export default class AtualizarMesa {
    constructor(private repositorioMesa: RepositorioMesa){}

    async executar(id: string, dados: Partial<Mesa>): Promise<void>{
        await this.repositorioMesa.atualizar(id, dados)
    }
}