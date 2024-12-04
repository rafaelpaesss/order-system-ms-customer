import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';
import { Customer } from '../Interfaces/customer';
import { CustomersRepository } from '../Repositories/customersRepository';
import { ReturnValue } from '@aws-sdk/client-dynamodb'; // Importe o tipo ReturnValue

@Injectable()
export class CustomersAdapter implements CustomersRepository {
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async getCustomerByCpf(cpf: string): Promise<Customer | null> {
    try {
      const params = {
        TableName: 'Customers',
        Key: {
          cpf: { S: cpf },
        },
      };
      const result = await this.dynamoDBService.get(params);
      return result.Item ? (result.Item as Customer) : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting customer by CPF: ${error.message}`);
      }
      throw new Error('Unknown error occurred while getting customer by CPF.');
    }
  }

  async saveCustomer(customer: Customer): Promise<Customer> {
    try {
      const params = {
        TableName: 'Customers',
        Item: customer,
      };
      await this.dynamoDBService.put(params);
      return customer;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error saving customer: ${error.message}`);
      }
      throw new Error('Unknown error occurred while saving customer.');
    }
  }

  async updateCustomer(customer: Customer): Promise<Customer> {
    try {
      const params = {
        TableName: 'Customers',
        Key: {
          cpf: { S: customer.cpf },
        },
        UpdateExpression: 'SET #name = :name, #email = :email',
        ExpressionAttributeNames: {
          '#name': 'name',
          '#email': 'email',
        },
        ExpressionAttributeValues: {
          ':name': { S: customer.name },
          ':email': { S: customer.email },
        },
        ReturnValues: ReturnValue.ALL_NEW,
      };
      const result = await this.dynamoDBService.update(params);
      return result.Attributes as Customer;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating customer: ${error.message}`);
      }
      throw new Error('Unknown error occurred while updating customer.');
    }
  }

  async deleteCustomerByCpf(cpf: string): Promise<Customer | null> {
    try {
      const params = {
        TableName: 'Customers',
        Key: {
          cpf: { S: cpf },
        },
        ReturnValues: ReturnValue.ALL_OLD,
      };
      const result = await this.dynamoDBService.delete(params);
      return result.Attributes ? (result.Attributes as Customer) : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting customer by CPF: ${error.message}`);
      }
      throw new Error('Unknown error occurred while deleting customer by CPF.');
    }
  }
}
