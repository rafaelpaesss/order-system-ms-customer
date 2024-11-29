import { Injectable } from '@nestjs/common'; // Supondo uso de NestJS
import { DynamoDB } from 'aws-sdk'; // SDK do DynamoDB
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class DynamoDBService {
  private dynamoDbClient: DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDbClient = new DynamoDB.DocumentClient();
  }

  // Método para buscar um cliente por CPF
  async getCustomerByCpf(cpf: string): Promise<Record<string, any> | null> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: 'CustomersTable', // Nome da tabela no DynamoDB
      Key: {
        cpf: cpf, // A chave primária da tabela é o CPF
      },
    };

    try {
      const result = await this.dynamoDbClient.get(params).promise();
      if (!result.Item) {
        return null; // Se não encontrar, retorna null
      }
      return result.Item; // Retorna os dados do cliente como um objeto genérico
    } catch (err: any) {
      throw new InternalServerErrorException(
        err?.message ?? 'Error getting customer from DynamoDB.',
      );
    }
  }

  // Método para salvar um cliente no DynamoDB
  async saveCustomer(customer: Record<string, any>): Promise<Record<string, any>> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: 'CustomersTable', // Nome da tabela
      Item: customer, // Cliente a ser salvo
    };

    try {
      await this.dynamoDbClient.put(params).promise();
      return customer; // Retorna o cliente que foi salvo como um objeto genérico
    } catch (err: any) {
      throw new InternalServerErrorException(
        err?.message ?? 'Error saving customer to DynamoDB.',
      );
    }
  }
}
