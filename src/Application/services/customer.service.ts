import { Injectable } from '@nestjs/common';  // Adicionando o decorador Injectable
import { CustomersRepository } from '../../Domain/Repositories/customersRepository';
import { CreateCustomerDto } from '../../Presentation/Customers/dtos/create-customer.dto';
import { CustomerDto } from '../../Presentation/Customers/dtos/customers.dto';
import { Customer } from '../../Domain/Interfaces/customer';
import { BadRequestError, NotFoundError } from '../../Domain/Errors';

@Injectable()  // Decorador para injeção de dependência
export class CustomerService {
  constructor(private readonly customersRepository: CustomersRepository) {}  // Injeção do repositório no construtor

  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    const { cpf, name, email, password } = createCustomerDto;

    // Verifica se todos os campos necessários estão presentes
    if (!cpf || !name || !email || !password) {
      throw new BadRequestError('Missing required fields');
    }

    // Verifica se o cliente já existe
    const existingCustomer = await this.customersRepository.getCustomerByCpf(cpf);
    if (existingCustomer) {
      throw new BadRequestError('Customer already exists');
    }

    // Criação do cliente
    const customer: Customer = await this.customersRepository.createCustomer(cpf, name, email, password);

    // Retorna um DTO com os dados do cliente, sem a senha
    const customerDto: CustomerDto = {
      cpf: customer.cpf,
      name: customer.name,
      email: customer.email,
    };

    return customerDto;
  }

  async getCustomer(cpf: string, password: string): Promise<CustomerDto> {
    if (!cpf || !password) {
      throw new BadRequestError('CPF and password are required');
    }

    // Busca o cliente pelo CPF
    const customer = await this.customersRepository.getCustomerByCpf(cpf);
    if (!customer) {
      throw new NotFoundError('Customer not found');
    }

    // Verifica a senha
    if (customer.password !== password) {
      throw new BadRequestError('Invalid password');
    }

    // Retorna um DTO com os dados do cliente, sem a senha
    const customerDto: CustomerDto = {
      cpf: customer.cpf,
      name: customer.name,
      email: customer.email,
    };

    return customerDto;
  }
}
