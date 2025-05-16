export default interface IMesa{
    id?: string,
    nome: string,
    capacidade: number,
    status: 'disponivel' | 'reservada' | 'inativa'
}