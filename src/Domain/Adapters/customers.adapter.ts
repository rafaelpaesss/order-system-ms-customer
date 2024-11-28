import { Injectable } from '@nestjs/common';
import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { Customers } from '../Interfaces/customer';
import { CustomersRepository } from '../Repositories/customersRepository';

@Injectable()
export class CustomersAdapter implements CustomersRepository {
  private readonly client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({ region: 'us-east-1' }); // Região do DynamoDB
  }

  // Método para obter o cliente pelo CPF, agora validando a senha
  async getCustomerByCpf(cpf: string, password: string): Promise<Customers | null> {
    try {
      // Remover a máscara do CPF, se necessário
      const newCpf = cpf; // Se precisar remover a máscara, implemente a lógica aqui

      // Buscando o cliente no DynamoDB
      const params = {
        TableName: 'Customers', // Nome da tabela no DynamoDB
        Key: {
          cpf: { S: newCpf }, // Usando o CPF como chave de pesquisa
        },
      };

      const { Item } = await this.client.send(new GetItemCommand(params));

      // Verificando se o cliente foi encontrado
      if (!Item) {
        throw new Error('Cliente não encontrado');
      }

      // Convertendo os dados do DynamoDB para o formato de Customers
      const customer: Customers = {
        id: parseInt(Item.id.S), // Convertendo o ID de string para número
        name: Item.name.S,
        email: Item.email.S,
        cpf: Item.cpf.S,
        isAdmin: Item.isAdmin.BOOL,
        password: Item.password.S,
        createdAt: new Date(Item.createdAt.S),
        updatedAt: new Date(Item.updatedAt.S),
      };

      // Verificando a senha fornecida
      if (customer.password !== password) {
        throw new Error('Senha inválida');
      }

      return customer;
    } catch (error) {
      const message =
        error?.message || error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  // Método para salvar o cliente no DynamoDB
  async saveCustomer(customer: Customers): Promise<Customers> {
    try {
      // Criando um novo cliente no DynamoDB
      const params = {
        TableName: 'Customers', // Nome da tabela no DynamoDB
        Item: {
          id: { S: customer.id.toString() }, // ID como string
          name: { S: customer.name },
          email: { S: customer.email },
          cpf: { S: customer.cpf }, // CPF sem máscara
          isAdmin: { BOOL: customer.isAdmin },
          password: { S: customer.password },
          createdAt: { S: customer.createdAt.toISOString() }, // Convertendo a data para string
          updatedAt: { S: customer.updatedAt.toISOString() }, // Convertendo a data para string
        },
      };

      await this.client.send(new PutItemCommand(params));

      return customer;
    } catch (error) {
      const message =
        error?.message || error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }
}
