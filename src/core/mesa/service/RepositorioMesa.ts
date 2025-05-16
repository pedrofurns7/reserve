import Mesa from '../model/Mesa'

export default interface RepositorioMesa{
    inserir(mesa: Mesa): Promise<void>;
   // buscarTodas(): Promise<Mesa>;
}