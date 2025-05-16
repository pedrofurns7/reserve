import CasoDeUso from "@/core/shared/CasoDeUso";
import Mesa from "../model/Mesa";
import Id from '@/core/shared/Id'

import RepositorioMesa from "./RepositorioMesa";

export default class RegistrarMesa implements CasoDeUso<Mesa, void> {
   constructor(
     private repositorio: RepositorioMesa
   ){}

   async executar(mesa: Mesa): Promise<void>{

    const novaMesa: Mesa = {
        id: Id.gerarHash(),
        nome: mesa.nome,
        capacidade:mesa.capacidade,
        status: mesa.status
    }

    this.repositorio.inserir(novaMesa)
   }

}