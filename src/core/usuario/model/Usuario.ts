export type UserRole = 'viewer' | 'editor';
export default interface IUsuario {
    id?: string, 
    nome: string, 
    email: string,
    senha: string, 
    role: UserRole
}