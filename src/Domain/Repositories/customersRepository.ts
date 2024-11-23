// src/Domain/Repositories/customersRepository.ts
import { Customers } from '../Interfaces/customer';

export abstract class CustomersRepository {
  // Método para consultar o cliente pelo CPF, agora com senha
  abstract getCustomerByCpf(cpf: string, password: string): Promise<Customers | null>;

  // Método para salvar um novo cliente
  abstract saveCustomer(customer: Customers): Promise<Customers>;
}
