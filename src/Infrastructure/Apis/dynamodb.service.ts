// src/Infrastructure/dynamodb.service.ts
import { DynamoDB } from 'aws-sdk';

export class DynamoDBService {
  private tableName: string;
  private dynamoDB: DynamoDB;

  // Modificação: Agora o construtor recebe o nome da tabela como argumento
  constructor(tableName: string) {
    this.tableName = tableName;  // Armazena o nome da tabela
    this.dynamoDB = new DynamoDB();  // Instancia o DynamoDB
  }

  // Método para colocar um item na tabela
  async putItem(item: any): Promise<any> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: item
    };

    return this.dynamoDB.put(params).promise();
  }

  // Método para obter um item da tabela
  async getItem(cpf: string): Promise<any> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: { cpf }
    };

    const result = await this.dynamoDB.get(params).promise();
    return result.Item;
  }

  // Método para atualizar um item na tabela
  async updateItem(cpf: string, item: any): Promise<any> {
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: { cpf },
      UpdateExpression: "set #name = :name, #email = :email",
      ExpressionAttributeNames: {
        "#name": "name",
        "#email": "email"
      },
      ExpressionAttributeValues: {
        ":name": item.name,
        ":email": item.email
      },
      ReturnValues: "UPDATED_NEW"
    };

    return this.dynamoDB.update(params).promise();
  }
}
