// src/Application/services/customer.service.ts
import { Injectable } from '@nestjs/common';
import { CustomersRepository } from '@Domain/Repositories/customersRepository'; // Repositório de clientes
import { CreateCustomerDto } from '../../Presentation/Customers/dtos/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customersRepository: CustomersRepository, // Injeção do repositório
  ) {}

  // Método para buscar o cliente pelo CPF e senha
  async getByCpf(cpf: string, password: string): Promise<any> { // Retorno genérico
    const customer = await this.customersRepository.findByCpf(cpf); // Busca pelo repositório
    if (customer && customer.password === password) { // Validação de senha
      return customer; // Retorna o cliente encontrado
    }
    return null; // Retorna null se não encontrar
  }

  // Método para criar um cliente
  async create(customerData: CustomersDto): Promise<any> {
    const newCustomer = await this.customersRepository.create(customerData);
    return newCustomer;
  }
}
