import { Injectable } from '@nestjs/common'; // Supondo uso de NestJS
import { DynamoDB } from 'aws-sdk'; // SDK do DynamoDB
import { CustomerRepository } from '@Domain/Repositories/customersRepository';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Customer } from '@Domain/Entities/customer.entity'; // Certifique-se de importar o tipo Customer

@Injectable()
export class DynamoDBService {
  private dynamoDbClient: DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDbClient = new DynamoDB.DocumentClient();
  }

  // Método para buscar um cliente por CPF
  async getCustomerByCpf(cpf: string): Promise<Customer | null> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: 'CustomersTable',  // Nome da tabela no DynamoDB
      Key: {
        cpf: cpf,  // A chave primária da tabela é o CPF
      },
    };

    try {
      const result = await this.dynamoDbClient.get(params).promise();
      if (!result.Item) {
        return null;  // Se não encontrar, retorna null
      }
      // Retorna o cliente encontrado (garantindo que o tipo seja Customer)
      return result.Item as Customer;  
    } catch (err: any) {
      throw new InternalServerErrorException(
        err?.message ?? 'Error getting customer from DynamoDB.'
      );
    }
  }

  // Método para salvar um cliente no DynamoDB
  async saveCustomer(customer: Customer): Promise<Customer> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: 'CustomersTable',  // Nome da tabela
      Item: customer,  // Cliente a ser salvo
    };

    try {
      await this.dynamoDbClient.put(params).promise();
      return customer;  // Retorna o cliente que foi salvo
    } catch (err: any) {
      throw new InternalServerErrorException(
        err?.message ?? 'Error saving customer to DynamoDB.'
      );
    }
  }
}
