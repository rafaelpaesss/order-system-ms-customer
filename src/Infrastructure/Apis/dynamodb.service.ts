// src/Infrastructure/dynamodb.service.ts
import { DynamoDB } from 'aws-sdk';

export class DynamoDBService {
  private tableName: string;
  private dynamoDB: DynamoDB.DocumentClient;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.dynamoDB = new DynamoDB.DocumentClient();  // Usa o DocumentClient para facilitar o trabalho com dados JSON
  }

  // Método para inserir um item na tabela
  async putItem(item: any): Promise<void> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: item,
    };

    await this.dynamoDB.put(params).promise();
  }

  // Método para buscar um item da tabela
  async getItem(cpf: string): Promise<any> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: { cpf },
    };

    const result = await this.dynamoDB.get(params).promise();
    return result.Item;
  }

  // Método para atualizar um item na tabela
  async updateItem(cpf: string, item: any): Promise<void> {
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: { cpf },
      UpdateExpression: "set #name = :name, #email = :email, #password = :password",
      ExpressionAttributeNames: {
        "#name": "name",
        "#email": "email",
        "#password": "password",
      },
      ExpressionAttributeValues: {
        ":name": item.name,
        ":email": item.email,
        ":password": item.password,
      },
      ReturnValues: "ALL_NEW",
    };

    await this.dynamoDB.update(params).promise();
  }
}
