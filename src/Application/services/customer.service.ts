import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../../../Infrastructure/dynamodb.service'; // Ajuste o caminho conforme necessário
import { Customer } from '../../../Domain/Interfaces/customer'; // Ajuste o caminho conforme necessário

@Injectable()
export class CustomersService {
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  // Método para buscar um cliente pelo CPF
  async getByCpf(cpf: string): Promise<Customer | null> {
    const params = {
      TableName: 'customers', // Substitua com o nome da sua tabela DynamoDB
      Key: {
        cpf: { S: cpf },
      },
    };

    const result = await this.dynamoDBService.get(params);

    if (result.Item) {
      return this.transformToCustomer(result.Item); // Converte o item retornado para o formato esperado
    }

    return null; // Retorna null caso o cliente não seja encontrado
  }

  // Método para salvar um novo cliente
  async saveCustomer(customer: Customer): Promise<Customer> {
    const params = {
      TableName: 'customers', // Substitua com o nome da sua tabela DynamoDB
      Item: {
        cpf: { S: customer.cpf },
        name: { S: customer.name },
        email: { S: customer.email },
      },
    };

    await this.dynamoDBService.put(params);

    return customer; // Retorna o cliente salvo
  }

  // Método para atualizar um cliente existente
  async updateCustomer(customer: Customer): Promise<Customer> {
    const params = {
      TableName: 'customers', // Substitua com o nome da sua tabela DynamoDB
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
      ReturnValues: 'ALL_NEW', // Retorna os dados após a atualização
    };

    const result = await this.dynamoDBService.update(params);
    return this.transformToCustomer(result.Attributes); // Retorna o cliente atualizado
  }

  // Método para deletar um cliente
  async deleteCustomer(cpf: string): Promise<Customer | null> {
    const params = {
      TableName: 'customers', // Substitua com o nome da sua tabela DynamoDB
      Key: {
        cpf: { S: cpf },
      },
    };

    const result = await this.dynamoDBService.delete(params);

    if (result.Attributes) {
      return this.transformToCustomer(result.Attributes); // Retorna o cliente deletado
    }

    return null; // Retorna null caso o cliente não seja encontrado para excluir
  }

  // Função para transformar o Item retornado do DynamoDB para o formato Customer
  private transformToCustomer(item: any): Customer {
    return {
      cpf: item.cpf.S,
      name: item.name.S,
      email: item.email.S,
    };
  }
}
