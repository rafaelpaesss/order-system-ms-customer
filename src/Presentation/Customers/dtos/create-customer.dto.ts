export class CreateCustomerDto {
  cpf: string;
  name: string;
  email: string;
  password: string;  // Senha em texto simples (não segura para produção)
}
