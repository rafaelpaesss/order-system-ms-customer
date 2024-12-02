export class CreateCustomerDto {
  cpf: string;
  name: string;
  email: string;
  password: string;

  constructor(cpf: string, name: string, email: string, password: string) {
    this.cpf = cpf;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
