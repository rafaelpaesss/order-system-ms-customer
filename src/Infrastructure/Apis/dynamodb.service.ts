import { Injectable } from '@nestjs/common';
import { DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { Customer } from '../../Domain/Interfaces/customer';

@Injectable()
export class DynamoDBService {
  private client: DynamoDBClient;

  constructor() {
    // Configuração do DynamoDBClient
    this.client = new DynamoDBClient({
      region: 'us-east-1',  // Altere para a região desejada
    });
  }

  // Método para obter um cliente por CPF
  async getCustomerByCpf(cpf: string): Promise<Customer | null> {
    const command = new GetItemCommand({
      TableName: 'Customers', // Nome da sua tabela no DynamoDB
      Key: {
        cpf: { S: cpf },
      },
    });

    try {
      const data = await this.client.send(command);
      if (!data.Item) return null;
      
      return {
        cpf: data.Item.cpf.S,
        name: data.Item.name.S,
        email: data.Item.email.S,
        password: data.Item.password.S,
      };
    } catch (error) {
      throw new Error('Error fetching customer');
    }
  }

  // Método para criar um novo cliente
  async createCustomer(customer: Customer): Promise<Customer> {
    const command = new PutItemCommand({
      TableName: 'Customers', // Nome da sua tabela no DynamoDB
      Item: {
        cpf: { S: customer.cpf },
        name: { S: customer.name },
        email: { S: customer.email },
        password: { S: customer.password },
      },
    });

    try {
      await this.client.send(command);
      return customer;
    } catch (error) {
      throw new Error('Error creating customer');
    }
  }

  // Outros métodos como update, delete, etc. podem ser adicionados aqui conforme necessário
}
