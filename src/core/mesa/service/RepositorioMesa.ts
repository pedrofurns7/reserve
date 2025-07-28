import Mesa from '../model/Mesa'

export default interface RepositorioMesa{
    inserir(mesa: Mesa): Promise<void>;
    listarTodas(filtro?: { disponivel?: boolean }): Promise<Mesa[]>;
    atualizar(id: string, dados: Partial<Mesa>): Promise<void>;
}