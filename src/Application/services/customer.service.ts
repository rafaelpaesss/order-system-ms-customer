import { Injectable } from '@nestjs/common';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository'; // Certifique-se de que o caminho está correto
import { Customer } from '../../Domain/Interfaces/customer'; // Ajuste o caminho conforme necessário

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  // Buscar um cliente pelo CPF
  async getCustomerByCpf(cpf: string): Promise<Customer | null> {
    return this.customersRepository.getCustomerByCpf(cpf); // Certifique-se de que esse método está implementado no repositório
  }

  // Salvar um novo cliente
  async create(customer: Customer): Promise<Customer> {
    return this.customersRepository.saveCustomer(customer);
  }

  // Atualizar um cliente existente
  async update(id: number, updatedCustomer: Customer): Promise<Customer> {
    return this.customersRepository.updateCustomer(id, updatedCustomer);
  }

  // Deletar um cliente pelo ID
  async delete(id: number): Promise<void> {
    return this.customersRepository.deleteCustomerById(id);
  }
}
