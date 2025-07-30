export default interface IMesa {
    id?: string,        
    usuarioId: string, // ID do usuário que criou a mesa
    mesaId: string, // ID da mesa reservada
    dataReserva: Date, // Data e hora da reserva
    status: 'ativo' | 'cancelado' // Indica se a reserva está ativa ou cancelada
}