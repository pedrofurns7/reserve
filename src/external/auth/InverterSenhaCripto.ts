import ProvedorCriptografia from "../../core/usuario/service/ProvedorCriptografia";


//Na arquitetura hexagonal esta classe é um Adaptador
//O adaptador NÃO FAZ parte do core bussiness da aplicação
export default class InverterSenhaCripto implements ProvedorCriptografia{
    criptografar(senha: string): string{
        return senha.split('').reverse().join('')
    }
}