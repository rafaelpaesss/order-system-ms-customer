import { Injectable } from '@nestjs/common';
import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { Customers } from 'src/Domain/Interfaces/customer';

@Injectable()
export class CustomersRepository {
  private readonly client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({ region: 'us-east-1' });
  }

  // Método para obter o cliente pelo CPF
  async getCustomerByCpf(cpf: string, password: string): Promise<Customers | null> {
    const params = {
      TableName: 'Customers', // Nome da tabela no DynamoDB
      Key: {
        cpf: { S: cpf }, // Usando o CPF como chave de pesquisa
      },
    };

    try {
      const { Item } = await this.client.send(new GetItemCommand(params));

      // Verifica se o item foi encontrado
      if (Item) {
        // Converte o Item do DynamoDB para o formato do Customers
        const customer: Customers = {
          id: parseInt(Item.id.S), // Supondo que o ID seja um campo no formato string
          name: Item.name.S,
          email: Item.email.S,
          cpf: Item.cpf.S,
          isAdmin: Item.isAdmin.BOOL,
          password: Item.password.S,
          createdAt: new Date(Item.createdAt.S),
          updatedAt: new Date(Item.updatedAt.S),
        };

        // Verifica a senha (se necessário)
        if (customer.password === password) {
          return customer;
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting customer by CPF:', error);
      throw new Error('Error getting customer by CPF');
    }
  }

  // Método para salvar um cliente
  async saveCustomer(customer: Customers): Promise<Customers> {
    const params = {
      TableName: 'Customers', // Nome da tabela no DynamoDB
      Item: {
        id: { S: customer.id.toString() },
        name: { S: customer.name },
        email: { S: customer.email },
        cpf: { S: customer.cpf },
        isAdmin: { BOOL: customer.isAdmin },
        password: { S: customer.password },
        createdAt: { S: customer.createdAt.toISOString() },
        updatedAt: { S: customer.updatedAt.toISOString() },
      },
    };

    try {
      await this.client.send(new PutItemCommand(params));
      return customer;
    } catch (error) {
      console.error('Error saving customer:', error);
      throw new Error('Error saving customer');
    }
  }
}
