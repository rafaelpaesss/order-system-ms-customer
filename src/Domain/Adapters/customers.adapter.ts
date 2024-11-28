// src/Infrastructure/dynamodb.service.ts

import { Injectable } from '@nestjs/common';  // Supondo uso de NestJS
import { DynamoDB } from 'aws-sdk';  // SDK do DynamoDB
import { Customer } from '@Domain/entities/customer.entity';  // Supondo que você tenha uma entidade Customer
import { CustomerRepository } from '@Domain/customersRepository';
import { DynamoDBService } from '@Infrastructure/dynamodb.service';
import { NotFoundException } from '@nestjs/common';

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
      return result.Item as Customer;  // Retorna o cliente encontrado
    } catch (err: any) {
      //console.error('Error getting customer from DynamoDB:', error);
      throw new NotFoundException(err?.message ?? 'Error getting customer from DynamoDB:'');
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
      //console.error('Error saving customer to DynamoDB:', error);
      throw new NotFoundException(err?.message ?? 'Error getting customer from DynamoDB:'');
    }
  }
}
