import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';  // Corrigido para o caminho correto
import { Customer } from '../Interfaces/customer';

@Injectable() 
export class CustomersRepository {
  constructor(private readonly dynamoDBService: DynamoDBService) {}  // Injeção do DynamoDBService via constructor

  // Método para criar um novo cliente
  async createCustomer(cpf: string, name: string, email: string, password: string): Promise<Customer> {
    const customer: Customer = {
      cpf,
      name,
      email,
      password, 
    };

    // Insere o cliente no DynamoDB
    await this.dynamoDBService.putItem(customer);

    return customer;  // Retorna o cliente criado
  }

  // Método para buscar um cliente pelo CPF
  async getCustomerByCpf(cpf: string): Promise<Customer | null> {
    const result = await this.dynamoDBService.getItem(cpf);

    // Retorna null se o cliente não for encontrado
    if (!result) return null;

    // Mapeia os dados recebidos do DynamoDB para o formato do Customer
    return {
      cpf: result.cpf,
      name: result.name,
      email: result.email,
      password: result.password,  // Senha em texto simples
    };
  }

  // Método para atualizar os dados de um cliente
  async updateCustomer(customer: Customer): Promise<Customer> {
    await this.dynamoDBService.updateItem(customer.cpf, customer);
    return customer;  // Retorna o cliente atualizado
  }
}
