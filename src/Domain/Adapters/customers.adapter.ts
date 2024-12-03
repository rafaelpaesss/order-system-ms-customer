import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamoDB.service';
import { Customers } from '../Interfaces/customers';
import { CustomersRepository } from '../Repositories/customersRepository';

@Injectable()
export class CustomersAdapter implements CustomersRepository {
  constructor(private dynamoDBService: DynamoDBService) {}

  async getCustomerById(id: number): Promise<Customers | null> {
    try {
      const params = {
        TableName: 'Customers', // Substitua pelo nome da sua tabela no DynamoDB
        Key: {
          id: { N: id.toString() },
        },
      };
      const result = await this.dynamoDBService.get(params);
      return result.Item ? (result.Item as Customers) : null;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async saveCustomer(customers: Customers): Promise<Customers> {
    try {
      const params = {
        TableName: 'Customers', // Substitua pelo nome da sua tabela no DynamoDB
        Item: customers,
      };
      await this.dynamoDBService.put(params);
      return customers;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCustomer(customer: Customers): Promise<Customers> {
    try {
      const params = {
        TableName: 'Customers', // Substitua pelo nome da sua tabela no DynamoDB
        Key: {
          id: { N: customer.id.toString() },
        },
        UpdateExpression: 'SET #name = :name, #email = :email', // Exemplo de campos para atualizar
        ExpressionAttributeNames: {
          '#name': 'name',
          '#email': 'email',
        },
        ExpressionAttributeValues: {
          ':name': { S: customer.name },
          ':email': { S: customer.email },
        },
        ReturnValues: 'ALL_NEW',
      };
      const result = await this.dynamoDBService.update(params);
      return result.Attributes as Customers;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCustomerById(id: number): Promise<Customers> {
    try {
      const params = {
        TableName: 'Customers', // Substitua pelo nome da sua tabela no DynamoDB
        Key: {
          id: { N: id.toString() },
        },
        ReturnValues: 'ALL_OLD',
      };
      const result = await this.dynamoDBService.delete(params);
      return result.Attributes ? (result.Attributes as Customers) : null;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
