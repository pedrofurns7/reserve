import CasoDeUso from "@/core/shared/CasoDeUso"
import Reserva from "../model/Reserva"
import Id from "@/core/shared/Id"
import RepositorioReserva from "./RepositorioReserva"
import AtualizarMesa from "@/core/mesa/service/AtualizarMesa"
import {BuscarMesa} from "@/core/mesa/service/BuscarMesa"

export default class RegistrarReserva implements CasoDeUso<Reserva, void> {
  constructor(
    private repositorio: RepositorioReserva,
    private atualizarMesa: AtualizarMesa,
    private buscarMesa: BuscarMesa
  ) {}

  async executar(reserva: Reserva): Promise<void> {
    const hoje = new Date()

    const novaReserva: Reserva = {
      id: Id.gerarHash(),
      usuarioId: reserva.usuarioId,
      mesaId: reserva.mesaId,
      dataReserva: reserva.dataReserva,
      quantidadePessoas: reserva.quantidadePessoas,
      status: reserva.status,
    }

    const disponivel = await this.repositorio.estaDisponivel(reserva.mesaId, reserva.dataReserva);

    if (!disponivel) {
      throw new Error("A mesa já está reservada nesta data");
    }

    if(novaReserva.dataReserva < new Date()) {
        throw new Error("A data da reserva não pode ser no passado.")
    }

    //inserir validação para verificar se a mesa está disponível
    const mesa = await this.buscarMesa.executar(reserva.mesaId)

    if(!mesa) {
        throw new Error("Mesa não encontrada.")
    }

    if(mesa.capacidade < reserva.quantidadePessoas) {
      throw new Error("Quantidade de pessoas excede a capacidade da mesa.")
    }

    await this.repositorio.inserir(novaReserva)

    await this.atualizarMesa.executar(reserva.mesaId, {
      status: 'reservada'
    })
  }
}
