// src/Infrastructure/dynamodb.service.ts
import { DynamoDB } from 'aws-sdk';

export class DynamoDBService {
  private db: DynamoDB.DocumentClient;

  constructor() {
    this.db = new DynamoDB.DocumentClient();
  }

  // Método para adicionar um item no DynamoDB
  async putItem(item: any) {
    const params = {
      TableName: 'Customers',  // Nome da tabela no DynamoDB
      Item: item,
    };

    try {
      await this.db.put(params).promise();
    } catch (error) {
      throw new Error(`Failed to put item: ${error.message}`);
    }
  }

  // Método para obter um item do DynamoDB
  async getItem(cpf: string) {
    const params = {
      TableName: 'Customers',  // Nome da tabela
      Key: { cpf },  // A chave primária que identifica o item
    };

    try {
      const result = await this.db.get(params).promise();
      return result.Item;  // Retorna o item obtido
    } catch (error) {
      throw new Error(`Failed to get item: ${error.message}`);
    }
  }

  // Método para atualizar um item no DynamoDB
  async updateItem(cpf: string, updatedData: any) {
    const params = {
      TableName: 'Customers',
      Key: { cpf },  // Chave para identificar o item
      UpdateExpression: 'set #name = :name, #email = :email',  // Expressão para atualizar atributos
      ExpressionAttributeNames: {
        '#name': 'name',
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':name': updatedData.name,
        ':email': updatedData.email,
      },
      ReturnValues: 'ALL_NEW',  // Retorna o item atualizado
    };

    try {
      const result = await this.db.update(params).promise();
      return result.Attributes;  // Retorna o item atualizado
    } catch (error) {
      throw new Error(`Failed to update item: ${error.message}`);
    }
  }
}
