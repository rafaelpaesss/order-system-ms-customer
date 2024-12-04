import { Injectable } from '@nestjs/common';
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { Customer } from '../../Domain/Interfaces/customer';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  /**
   * Buscar um cliente pelo CPF.
   * @param cpf O CPF do cliente a ser buscado.
   * @returns O cliente correspondente ou null se não encontrado.
   */
  async getCustomerByCpf(cpf: string): Promise<Customer | null> {
    return this.customersRepository.getCustomerByCpf(cpf);
  }

  /**
   * Salvar um novo cliente.
   * @param customer Os dados do cliente a serem salvos.
   * @returns O cliente salvo.
   */
  async create(customer: Customer): Promise<Customer> {
    return this.customersRepository.saveCustomer(customer);
  }

  /**
   * Atualizar um cliente existente.
   * @param updatedCustomer Os dados atualizados do cliente.
   * @returns O cliente atualizado.
   */
  async update(updatedCustomer: Customer): Promise<Customer> {
    return this.customersRepository.updateCustomer(updatedCustomer);
  }

  /**
   * Deletar um cliente pelo CPF.
   * @param cpf O CPF do cliente a ser deletado.
   */
  async delete(cpf: string): Promise<void> {
    await this.customersRepository.deleteCustomerByCpf(cpf);
  }
}
