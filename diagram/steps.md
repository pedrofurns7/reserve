# Próximo passos 

### Autenticação de Usuário 

1. Autenticação usuários 
    - Registro: O usuário deve ser capaz de se registrar com um nome, e-mail e senha. ✅
    - Login: Usuários autenticados recebem um token JWT para acesso às funcionalidades de reservas.✅
    - Restrição de Acesso: Apenas usuários logados podem criar e visualizar reservas. **NEXT STEP**  atualmente está funcionando apenas o middleware de autenticação(token usuario)
    
2. Gestão de Mesas 
    - Listagem: Listar todas as mesas disponíveis no restaurante. ✅
    - Criar Mesa: Administradores podem adicionar novas mesas ao sistema com um nome e capacidade de pessoas. ✅
    - Status da Mesa: Cada mesa pode estar disponível, reservada ou inativa. ✅ 
    - Implementação do método de atualização de mesas ✅ (incluir validação de usuário logado)
        - mudar atualização para patch ✅

3. Sistema de Reservas
    - Criar Reserva: Usuários autenticados podem criar reservas para mesas específicas. ⚠️
        - criar endpoint ✅
        - verificar se mesa passada está com status 'disponivel' ✅ 
        - realizar atualização no status da mesa ✅
        - marcar para data e hora futura ✅
        - receber no endpoint a qtd de lugares na mesa apenas para validar se a mesa passada podera ser utilizada ✅
        - verificar se a mesa passada esta disponivel no dia informado ✅
    - Verificar Disponibilidade: A API deve verificar se a mesa está disponível no horário solicitado antes de confirmar a reserva. ✅
    - Cancelar Reserva: Usuários podem cancelar suas reservas, o que libera a mesa para novas reservas. ⚠️

4. Controle de Status
    - Status das Mesas: Mesas ficam reservadas automaticamente ao serem associadas a uma reserva. ✅
    - Status das Reservas: Reservas têm status ativo quando confirmadas e cancelado quando canceladas. ⚠️

----

### documentação dos desafios encontrados durante desenvolvimento

- [x] problemas com o date 
- [x] ao tentar reaproveitar o atualizarMesa para a funcionalidade de reserva foi necessário transformar em patch para não altear todos os campos, porém foi verificado que na query também seria necessário realizar uma alteração pois ela estava atualizando todos os dados, foi ajustado para criar a query dinamicamente, realizando uma verificação nos campos enviados e atualizando somente estes.
- [x] erro no momento da verificação da disponibilidade
