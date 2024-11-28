// src/Domain/customersRepository.ts

import { CustomerRepository } from '@Domain/customersRepository';
import { Customer } from '@Domain/entities/customer.entity';
import { DynamoDBService } from '@Infrastructure/dynamodb.service';


export class CustomerRepository {
  private dynamoDBService: DynamoDBService;

  constructor(dynamoDBService: DynamoDBService) {
    this.dynamoDBService = dynamoDBService;
  }

  // Método para buscar um cliente por CPF
  async findByCpf(cpf: string): Promise<Customer | null> {
    try {
      const customer = await this.dynamoDBService.getCustomerByCpf(cpf);
      return customer;
    } catch (error) {
      console.error('Error finding customer by CPF:', error);
      throw new Error('Error finding customer');
    }
  }

  // Método para salvar um cliente no DynamoDB
  async save(customer: Customer): Promise<Customer> {
    try {
      const savedCustomer = await this.dynamoDBService.saveCustomer(customer);
      return savedCustomer;
    } catch (error) {
      console.error('Error saving customer:', error);
      throw new Error('Error saving customer');
    }
  }
  
  // Método para atualizar um cliente no DynamoDB (caso necessário)
  async update(customer: Customer): Promise<Customer> {
    try {
      const existingCustomer = await this.findByCpf(customer.cpf);
      if (!existingCustomer) {
        throw new Error('Customer not found for update');
      }

      // Suponhamos que você só precise atualizar os campos alterados
      const updatedCustomer = {
        ...existingCustomer,
        ...customer,  // Atualiza com os novos dados
        updatedAt: new Date().toISOString(),
      };

      await this.dynamoDBService.saveCustomer(updatedCustomer);  // Reempla os dados no DynamoDB
      return updatedCustomer;  // Retorna o cliente atualizado
    } catch (error) {
      console.error('Error updating customer:', error);
      throw new Error('Error updating customer');
    }
  }
}
