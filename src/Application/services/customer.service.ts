// src/Application/services/customer.service.ts
import { Injectable } from '@nestjs/common';
import { CustomersRepository } from '@Domain/Repositories/customersRepository'; // Repositório de clientes

@Injectable()
export class CustomerService {
  constructor(
    private readonly customersRepository: CustomersRepository, // Injeção do repositório
  ) {}

  // Método para buscar o cliente pelo CPF e senha
  async getByCpf(cpf: string, password: string): Promise<Customer | null> {
    // Lógica para validar o cliente
    const customer = await this.customersRepository.findByCpf(cpf);
    if (customer && customer.password === password) { // Comparando senha
      return customer;
    }
    return null;
  }

  // Método para criar um cliente
  async create(customerData: CreateCustomerDto): Promise<Customer> {
    const newCustomer = await this.customersRepository.create(customerData);
    return newCustomer;
  }
}
