// src/Application/services/customer.service.ts

import { Injectable } from '@nestjs/common';  // Supondo que está usando NestJS, ajuste conforme necessário
import { CustomerRepository } from '@Domain/customersRepository';
import { Customer } from '@Domain/entities/customer.entity';
import { DynamoDBService } from '@Infrastructure/dynamodb.service';

@Injectable()
export class CustomerService {
  private customerRepository: CustomerRepository;

  constructor(
    private dynamoDBService: DynamoDBService,  // Dependência do serviço DynamoDB
  ) {
    this.customerRepository = new CustomerRepository(this.dynamoDBService);
  }

  // Método para validar se o usuário existe no DynamoDB
  async validateUser(cpf: string, password: string): Promise<boolean> {
    try {
      const customer = await this.customerRepository.findByCpf(cpf);

      if (!customer) {
        throw new Error('Customer not found');
      }

      // Aqui você pode adicionar a lógica para verificar a senha
      if (customer.password !== password) {
        throw new Error('Invalid password');
      }

      return true;  // Usuário validado com sucesso
    } catch (error) {
      console.error('Error validating user:', error);
      throw error;
    }
  }

  // Método para cadastrar um novo usuário no DynamoDB
  async registerCustomer(customer: Customer): Promise<Customer> {
    try {
      // Primeiro, você pode verificar se o usuário já existe
      const existingCustomer = await this.customerRepository.findByCpf(customer.cpf);
      if (existingCustomer) {
        throw new Error('Customer with this CPF already exists');
      }

      // Aqui você pode criar a lógica de validação dos dados antes de salvar no banco
      const newCustomer = await this.customerRepository.save(customer);

      return newCustomer;  // Retorna o cliente cadastrado
    } catch (error) {
      console.error('Error registering customer:', error);
      throw error;
    }
  }
}
