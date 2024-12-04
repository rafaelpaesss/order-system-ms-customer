import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../../Infrastructure/Apis/dynamodb.service';
import { Customers } from '../Interfaces/customer';
import { CustomersRepository } from '../Repositories/customersRepository';

@Injectable()
export class CustomersAdapter implements CustomersRepository {
  constructor(private dynamoDBService: DynamoDBService) {}

  async getCustomerById(id: number): Promise<Customers | null> {
    try {
      const params = {
        TableName: 'Customers',
        Key: {
          id: { N: id.toString() },
        },
      };
      const result = await this.dynamoDBService.get(params);
      return result.Item ? (result.Item as Customers) : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting customer by ID: ${error.message}`);
      }
      throw new Error('Unknown error occurred while getting customer by ID.');
    }
  }

  async saveCustomer(customers: Customers): Promise<Customers> {
    try {
      const params = {
        TableName: 'Customers',
        Item: customers,
      };
      await this.dynamoDBService.put(params);
      return customers;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error saving customer: ${error.message}`);
      }
      throw new Error('Unknown error occurred while saving customer.');
    }
  }

  async updateCustomer(customer: Customers): Promise<Customers> {
    try {
      const params = {
        TableName: 'Customers',
        Key: {
          id: { N: customer.id.toString() },
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
        ReturnValues: 'ALL_NEW',
      };
      const result = await this.dynamoDBService.update(params);
      return result.Attributes as Customers;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating customer: ${error.message}`);
      }
      throw new Error('Unknown error occurred while updating customer.');
    }
  }

  async deleteCustomerById(id: number): Promise<Customers | null> {
    try {
      const params = {
        TableName: 'Customers',
        Key: {
          id: { N: id.toString() },
        },
        ReturnValues: 'ALL_OLD',
      };
      const result = await this.dynamoDBService.delete(params);
      return result.Attributes ? (result.Attributes as Customers) : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting customer by ID: ${error.message}`);
      }
      throw new Error('Unknown error occurred while deleting customer by ID.');
    }
  }
}
